'use client'; // Context'in client-side çalışması gerektiğini belirtir.

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(1);
    const [language, setLanguage] = useState('');
    const [currencyType, setCurrencyType] = useState('tl');

    useEffect(() => {
        const lang = localStorage.getItem('language') || 'tr'
        localStorage.setItem('language', lang)
        router.push(`?lang=${lang?.toString()}`);
        setLanguage(lang)
    }, [language])


    useEffect(() => {
        const currency = localStorage.getItem('currencyType') || 'tl'
        localStorage.setItem('currencyType', currency)
        setCurrencyType(currency)
    }, [currencyType])




    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleActiveMenu = (menuId) => setActiveMenuId(menuId);

    return (
        <GlobalContext.Provider value={{ isMenuOpen, activeMenuId, language, currencyType, toggleMenu, toggleActiveMenu, setLanguage, setCurrencyType }}>
            {children}
        </GlobalContext.Provider>
    );
};