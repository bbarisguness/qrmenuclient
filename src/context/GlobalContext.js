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

    useEffect(() => {
        const lang = localStorage.getItem('language') || 'tr'
        router.push(`?lang=${lang?.toString() || 'tr'}`);
        setLanguage(lang)
    }, [])

    useEffect(() => {
        const lang = localStorage.getItem('language') || 'tr'
        router.push(`?lang=${lang?.toString() || 'tr'}`);
        localStorage.setItem('language', language)
    }, [language])



    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleActiveMenu = (menuId) => setActiveMenuId(menuId);

    return (
        <GlobalContext.Provider value={{ isMenuOpen, activeMenuId, language, toggleMenu, toggleActiveMenu, setLanguage }}>
            {children}
        </GlobalContext.Provider>
    );
};