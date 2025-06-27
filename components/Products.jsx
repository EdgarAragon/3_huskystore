'use client'

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"


export default function Products(props) {
    const { planner, stickers } = props
    const [portalImage, setPortalImage] = useState(null)
    
    const { handleIncrementProduct, cart } = useProducts()
    console.log(cart)

    const pageSize = 50
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(stickers.length / pageSize)
    const paginatedProducts = stickers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const pastPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    function getProductQuantity(product) {
        const quantityStr = product?.metadata?.quantity
        const quantity = parseInt(quantityStr, 10)

        return isNaN(quantity) ? 0 : quantity
    }

    // if (!stickers.length || !planner) { return null }
    if (!stickers.length) { return null }

    return(
        <>
            {portalImage && (
                <Portal handleClosePortal={() => { setPortalImage(null) }}>
                    <div className="portal-content">
                        {/* <img className="img-display" src={`med_res/${portalImage}.jpeg`} alt={`${portalImage}-high-res`} /> */}
                        <img className="img-display" src={`med_res/${portalImage}.png`} alt={`${portalImage}-high-res`} />
                    </div>
                </Portal>
            )}
            <div className="section-container">
                <div className="section-header">
                    <h2>Shop Our Selection</h2>
                    {/* <p>From cards and accessories</p> */}
                </div>

                {/* <div className="planner-container">
                    <div>
                        <button onClick={() => {
                            setPortalImage('planner')
                        }} className="img-button">
                            <img src="low_res/planner.jpeg" alt="high-res-planner" />
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">
                            Medieval Dragon Month Planner
                        </p>
                        <h3><span>$</span>14.99</h3>
                        <p>Step into a realm of fantasy and organization with our <strong>Medieval Dragon Month Planner</strong>! This high-resolution PNG asset combines the fierce elegance of dragons with intricate medieval designs to create a planner that's not only functional but also a work of art. Whether you&apos;re jotting down quests, planning battles, or just scheduling your weekly grocery run, this planner is your ultimate companion.</p>
                        <ul>
                            <li><strong>Epic Dragon Artwork:</strong> Stunning hand-drawn dragon motifs and medieval-inspired borders make every month feel legendary.
                            </li>
                            <li>
                                <strong>Fully Printable:</strong> Designed at ultra-high resolution, it&apos;s perfect for printing on any size paper, from A4 to poster-sized displays.
                            </li>
                        </ul>
                        <div className="purchase-btns">
                            <button onClick={() => {
                                const plannerPricedId = planner.default_price
                                handleIncrementProduct(plannerPricedId, 1, planner)
                            }}>Add to cart</button>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="section-container">
                {/* <div className="section-header">
                    <h2>Or Collect Your Favorite Accessories</h2>
                    <p>Choose from our custom designed items</p>
                </div> */}
                <div className="sticker-container">
                    {paginatedProducts.map((sticker, stickerIndex) => {
                        const stickerName = sticker.name
                        // const stickerImgUrl = sticker.name.replaceAll(' Sticker.png', '').replaceAll(' ', '_')
                        const stickerImgUrl = sticker.name.replaceAll(' Sticker.png', '')
                        const priceId = sticker.default_price
                        const cartItem = cart[priceId]
                        const quantity = cartItem ? cartItem.quantity : 0
                        const remaining = getProductQuantity(sticker) - quantity
                        const outOfStock = remaining <= 0

                        return (
                            <div key={stickerIndex} className="sticker-card">
                                <button onClick={() => {
                                    setPortalImage(stickerImgUrl)
                                    }} className="img-button">
                                    {/* <img src={`low_res/${stickerImgUrl}.jpeg`} alt={`${stickerImgUrl}-low-res`}/> */}
                                    <img src={`low_res/${stickerImgUrl}.jpg`} alt={`${stickerImgUrl}-low-res`}/>
                                </button>
                                <div className="sticker-info">
                                    <p className="text-medium"> {stickerName.replaceAll('_', ' ')}</p>
                                    <p>{sticker.description}</p>
                                    <h4><span>$</span>{sticker.prices[0].unit_amount / 100}</h4>
                                    <p className="stock-text">
                                        {outOfStock ? 'Sold Out' : `In Stock: ${remaining}`}
                                    </p>
                                    <button onClick={() => {
                                        if (!outOfStock) {
                                            const stickerPriceId = sticker.default_price
                                            handleIncrementProduct(stickerPriceId, 1, sticker)
                                        }    
                                    }}
                                        disabled={outOfStock}>{outOfStock ? 'Out of Stock' : 'Add to cart'}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="pagination-controls">
        <button onClick={pastPage} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>

        </>
    )
}