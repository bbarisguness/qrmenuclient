'use client'; // Context'in client-side çalışması gerektiğini belirtir.

import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [isMenuOpen, setMenuOpen] = useState(true);
    const [activeMenuId, setActiveMenuId] = useState(1);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const toggleActiveMenu = (menuId) => setActiveMenuId(menuId);

    return (
        <GlobalContext.Provider value={{ isMenuOpen, activeMenuId, toggleMenu, toggleActiveMenu }}>
            {children}
        </GlobalContext.Provider>
    );
};