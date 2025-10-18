"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
import { Movie } from "../model/Movie";

interface Props {
    mode: ColorModes;
    toggleMode: () => void;
    favorites: Record<string, Movie>;
    addFavorite: (movie: Movie) => void;
    removeFavorite: (id: string) => void;
    menuShown: boolean;
    toggleMenu: () => void;
}

type ColorModes = 'dark' | 'light';

export const DataContext = createContext({} as Props);
const storageKeys = {
    Mode: 'mode',
    Favorites: 'favorites'
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

    function addFavorite(movie: Movie) {
        const theFavorites = {...favorites};
        theFavorites[movie.imdbID] = movie;
        setFavorites(theFavorites);

        localStorage.setItem(storageKeys.Favorites, JSON.stringify(theFavorites))
    }

    function removeFavorite(id: string) {
        const theFavorites = {...favorites};
        delete theFavorites[id];
        setFavorites(theFavorites);

        localStorage.setItem(storageKeys.Favorites, JSON.stringify(theFavorites));

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

        const prevFavorites = localStorage.getItem(storageKeys.Favorites);

        if (!prevFavorites)
            return;

        const prevFavoritesJson = JSON.parse(prevFavorites);
        setFavorites(prevFavoritesJson)

    }, []);

    return <DataContext.Provider value={{ mode, toggleMode, favorites, addFavorite, removeFavorite, menuShown, toggleMenu }}>
        {children}
    </DataContext.Provider>

}