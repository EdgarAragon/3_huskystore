'use client'

import Link from "next/link"

export default function SuccessPage() {
    return (
        <div className="page-container">
            <p className="text-large">Thank you for your purchase!</p>
            <h2></h2>
            <Link href={'/'}>
                <button>Continue &rarr</button>
            </Link>
        </div>
    )
}