"use client"
import { useGlobalContext } from '@/context/GlobalContext';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function LangMenu({ lang = 'tr', data, locale, color, modal = false }) {
    const { language, setLanguage } = useGlobalContext();
    const menuRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false)
    const pathname = usePathname()
    const path = pathname.split('/')[1]

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const changeLanguage = (name) => {
        setLanguage(name)
        localStorage.setItem('language', JSON.stringify({ name: path, lang: name }));
    }
    if (modal) {
        return (
            <>
                <div className="text-white font-semibold relative">
                    <div onClick={() => setMenuActive(true)} className="flex gap-1 cursor-pointer">
                        <span className="relative top-1"><IoIosArrowDown color={`#${color}`} /></span>
                        <span style={{ color: `#${color}` }}>{locale.toUpperCase()}</span>
                    </div>
                </div>

                {/* Modal Overlay */}
                {menuActive && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setMenuActive(false)}
                    >
                        {/* Modal Content */}
                        <div
                            ref={menuRef}
                            className="bg-white rounded-lg p-6 min-w-[200px] max-w-sm mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold text-black mb-4 text-center">
                                {lang === 'tr' ? 'Dil Seçiniz' : 'Select Language'}
                            </h3>

                            <div className="space-y-2">
                                {data?.map((itm, i) => {
                                    return (
                                        <div
                                            onClick={() => { changeLanguage(itm?.locale); setMenuActive(false) }}
                                            key={i}
                                            className="text-black p-2 rounded hover:bg-gray-100 cursor-pointer text-center transition-colors"
                                        >
                                            {itm?.locale?.toUpperCase()}
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setMenuActive(false)}
                                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded transition-colors"
                            >
                                Kapat
                            </button>
                        </div>
                    </div>
                )}
            </>
        )
    } else {
        return (
            <div className="text-white font-semibold relative">
                <div onClick={() => setMenuActive(true)} className="flex gap-1 cursor-pointer">
                    <span className="relative top-1"><IoIosArrowDown color={`#${color}`} /></span>
                    <span style={{ color: `#${color}` }}>{locale.toUpperCase()}</span>
                </div>
                {
                    menuActive &&
                    <div ref={menuRef} className="absolute bg-white rounded-[4px] px-[10px] py-[10px] text-center right-0">
                        {
                            data?.map((itm, i) => {
                                return (
                                    <div onClick={() => { changeLanguage(itm?.locale); setMenuActive(false) }} key={i} className={`text-black ${data?.length === i + 1 ? "" : "mb-[5px]"} cursor-pointer ${data?.length === i + 1 ? "" : "border-b"}`}>{itm?.locale.toUpperCase()}</div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        )
    }
}
