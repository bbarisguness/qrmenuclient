'use client';

import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton({ color }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={{ backgroundColor: color }}
                    className="fixed bottom-6 right-6 z-50 p-3 rounded-full text-white shadow-lg hover:bg-gray-800 transition-all"
                >
                    <FaArrowUp className="w-5 h-5" />
                </button>
            )}
        </>
    );
}