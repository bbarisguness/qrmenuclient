"use client"
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function CurrencyMenu({ data, color }) {
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

    return (
        <div className="text-white font-semibold relative">
            <div onClick={() => setMenuActive(true)} className="flex gap-1 cursor-pointer">
                <span className="relative top-1"><IoIosArrowDown color={`#${color}`} /></span>
                <span style={{ color: `#${color}` }}>{currencyType}</span>
            </div>
            {
                menuActive &&
                <div ref={menuRef} className="absolute bg-white rounded-[4px] px-[10px] py-[10px] text-center w-[50px] left-0">
                    {
                        langs?.map((itm, i) => {
                            return (
                                <div onClick={() => { changeLanguage(itm); setMenuActive(false) }} key={i} className={`text-black cursor-pointer ${langs?.length === i + 1 ? "" : "border-b"}`}>{itm}</div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}
