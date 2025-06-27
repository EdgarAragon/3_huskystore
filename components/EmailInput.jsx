'use client'

import { useState } from "react"

export default function EmailUpdate() {
    const [email, setEmail] = useState('')

    async function handleAddSubscriber() {
        try {
            //write the post fetch request to send off the email to the service that will handle email list
        } catch (err) {
            console.log('Failed to add subscriber: ', err.message)
        }
    }
    return (
    <div className="sign-up">
        <input value={email} onChange={(e) => {
            setEmail(e.target.value)
        }} placeholder="Email address..." />
        <button className="button-card">Sign Up</button>
    </div>
    )
}