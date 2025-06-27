'use client'

import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext()

export default function ProductsProvider(props) {
    const { children } = props

    const [cart, setCart] = useState({})

    // ✅ Load cart from localStorage on mount
    useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    }, []);

    // ✅ Save cart to localStorage whenever it changes
    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function handleIncrementProduct(price_id, num, data, noIncrement = false) {
        const newCart = {
            ...cart
        }
        if (price_id in cart) {
            //turns out the product is already in the cartt so take the previous value and incremnt/decremeent it
            // newCart[price_id] = newCart[price_id] + num
            newCart[price_id] = {
                ...data,
                quantity: noIncrement ? num : newCart[price_id]?.quantity + num
            }
        } else {
            //product not yet in cart, so add it
            newCart[price_id] = {
                    ...data,
                    quantity : num
                }
            
        }

        if (parseInt(newCart[price_id].quantity) <= 0) {
            //the user has set the number to 0, so we need to remove the product from the cart
            delete newCart[price_id]
        }
        
        //overwrite the cart state with the newCart object
        setCart(newCart)
    }

    const value = {
        cart,
        handleIncrementProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)