"use client"
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function CurrencyMenu({ data, color, modal = false }) {
    const { currencyType, setCurrencyType } = useGlobalContext();
    const menuRef = useRef(null);
    const [menuActive, setMenuActive] = useState(false)
    const [langs, setLangs] = useState([])

    const dt = ["tl", ...data?.map((itm) => itm?.currency)]

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
        setCurrencyType(name)
        localStorage.setItem('currencyType', name)
    }

    useEffect(() => {
        setLangs(dt?.filter((itm) => itm !== currencyType))
    }, [currencyType])

    if (modal) {
        return (
            <>
                <div className="text-white font-semibold relative">
                    <div onClick={() => setMenuActive(true)} className="flex gap-1 cursor-pointer">
                        <span className="relative top-1"><IoIosArrowDown color={`#${color}`} /></span>
                        <span style={{ color: `#${color}` }}>{currencyType.toUpperCase()}</span>
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
                                Para Birimi Seçiniz
                            </h3>

                            <div className="space-y-2">
                                {langs?.map((itm, i) => {
                                    return (
                                        <div
                                            onClick={() => { changeLanguage(itm); setMenuActive(false) }}
                                            key={i}
                                            className="text-black p-2 rounded hover:bg-gray-100 cursor-pointer text-center transition-colors"
                                        >
                                            {itm.toUpperCase()}
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
                    <span style={{ color: `#${color}` }}>{currencyType.toUpperCase()}</span>
                </div>
                {
                    menuActive &&
                    <div ref={menuRef} className="absolute bg-white rounded-[4px] px-[10px] py-[10px] text-center left-0">
                        {
                            langs?.map((itm, i) => {
                                return (
                                    <div onClick={() => { changeLanguage(itm); setMenuActive(false) }} key={i} className={`text-black ${langs?.length === i + 1 ? "" : "mb-[5px]"}  cursor-pointer ${langs?.length === i + 1 ? "" : "border-b"}`}>{itm.toUpperCase()}</div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        )
    }

}
