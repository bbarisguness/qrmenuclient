"use client"
import { useGlobalContext } from '@/context/GlobalContext';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function LangMenu({ data, locale, color }) {
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

    return (
        <div className="text-white font-semibold relative">
            <div onClick={() => setMenuActive(true)} className="flex gap-1 cursor-pointer">
                <span className="relative top-1"><IoIosArrowDown color={`#${color}`} /></span>
                <span style={{ color: `#${color}` }}>{locale.toUpperCase()}</span>
            </div>
            {
                menuActive &&
                <div ref={menuRef} className="absolute bg-white rounded-[4px] px-[10px] py-[10px] text-center w-[50px] right-0">
                    {
                        data?.map((itm, i) => {
                            return (
                                <div onClick={() => { changeLanguage(itm?.locale); setMenuActive(false) }} key={i} className={`text-black cursor-pointer ${data?.length === i + 1 ? "" : "border-b"}`}>{itm?.locale.toUpperCase()}</div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}
