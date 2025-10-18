"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { Movie } from "../model/Movie";

interface Props {
    mode: ColorModes;
    toggleMode: () => void;
    menuShown: boolean;
    toggleMenu: () => void;
}

type ColorModes = 'dark' | 'light';

export const DataContext = createContext({} as Props);
const storageKeys = {
    Mode: 'mode'
}

export function DataProvider({ children }: {
    children: ReactNode
}) {

    const [mode, setMode] = useState<ColorModes>('light');
    const [menuShown, setMenuShown] = useState(false);
    const [favorites, setFavorites] = useState({} as Record<string, Movie>);

    function toggleMode() {
        setMode(m => m == 'dark' ? 'light' : 'dark');

        localStorage.setItem(storageKeys.Mode, mode == 'dark' ? 'light' : 'dark')
    }

    
    function toggleMenu() {
        setMenuShown(ms => !ms)
    }

    useEffect(() => {
        const prevMode = localStorage.getItem(storageKeys.Mode);
        if (prevMode) {
            setMode(prevMode as ColorModes);
        } else {
            const newMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setMode(newMode);
        }

        
    }, []);

    return <DataContext.Provider value={{ mode, toggleMode, menuShown, toggleMenu }}>
        {children}
    </DataContext.Provider>

}