"use client"

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../components/searchBar";
import Container from "./container";
import PageSkeleton from "./pageSkeleton";
import { DataContext } from "../context/DataContext";
import { Movie } from "../model/Movie";
import MoviesGrid from "../components/moviesGrid";


export default function Favorites() {

    const searchRef = useRef<HTMLInputElement>(null);

    const { favorites } = useContext(DataContext);
    const [allFavorites, setAllFavorites] = useState<Movie[]>([])
    const [filteredFavorites, setFilteredFavorites] = useState<Movie[]>([]);


    function filterResults(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!searchRef.current?.value) {
            setFilteredFavorites(allFavorites);
            return;
        }
        


        setFilteredFavorites(f => allFavorites.filter(m => m.Title.toLowerCase().includes(searchRef.current!.value)))

    }

    useEffect(() => {
        const prevFavs = [] as Movie[];
        for (let fav in favorites) {
            prevFavs.push(favorites[fav]);
        }

        setFilteredFavorites(prevFavs);
        setAllFavorites(prevFavs);
    }, [favorites]);


    return <PageSkeleton>
        <Container className="flex flex-col gap-[1em] ml-[2ch]">
            
            <SearchBar ref={searchRef} triggerFormEvent={filterResults} />

            <MoviesGrid movieList={filteredFavorites} />            

        </Container>
    </PageSkeleton>

}