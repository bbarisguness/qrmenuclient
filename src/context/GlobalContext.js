'use client'; // Context'in client-side çalışması gerektiğini belirtir.

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(1);
    const [language, setLanguage] = useState('');
    const [currencyType, setCurrencyType] = useState('tl');
    const path = pathname.split('/')[1]

    // useEffect(() => {
    //     const lang = localStorage.getItem('language') || 'tr'
    //     localStorage.setItem('language', lang)
    //     router.push(`?lang=${lang?.toString()}`);
    //     setLanguage(lang)
    // }, [language])

    useEffect(() => {
        localStorage.removeItem('language')
    }, [])


    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        const lang = storedLang ? JSON.parse(storedLang).name === path ? JSON.parse(storedLang).lang : 'tr' : 'tr';
        localStorage.setItem('language', JSON.stringify({ name: path, lang: lang }));
        router.push(`?lang=${lang?.toString()}`);
        setLanguage(lang)
    }, [language]);


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