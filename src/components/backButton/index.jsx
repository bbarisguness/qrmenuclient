"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaChevronLeft } from "react-icons/fa";

export default function BackButton() {
    const router = useRouter()
    return (
        <button className='inline-flex items-center justify-center active:duration-200 duration-200 active:opacity-60 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 p-[8px] bg-[#00000080] backdrop-blur-lg' onClick={() => router.back()}>
            <FaChevronLeft color="#FFF" size={22} />
        </button>
    )
}
