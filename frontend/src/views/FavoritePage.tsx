"use client"

import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import SearchBar from "../components/searchBar";
import Container from "./container";
import PageSkeleton from "./pageSkeleton";
import { DataContext } from "../context/DataContext";
import { Movie } from "../model/Movie";
import MoviesGrid from "../components/moviesGrid";
import { useQuery } from "@tanstack/react-query";


export default function Favorites() {

    const searchRef = useRef<HTMLInputElement>(null);

    const [allFavorites, setAllFavorites] = useState<Movie[]>([])
    const [filteredFavorites, setFilteredFavorites] = useState<Movie[]>([]);
    const [currPage, setCurrPage] = useState(1);

    const { data, isLoading, refetch, error, isRefetching } = useQuery<Movie[]>({
        queryKey: ['movieSearch', 'Favorites'],
        queryFn: () => fetchFavorites({ page: currPage }).then((res) => res.json()),
        enabled: true
    })


    async function fetchFavorites({ page }: { page: number }) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}favorites/${page}`);
    }


    function filterResults(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!searchRef.current?.value) {
            setFilteredFavorites(allFavorites);
            return;
        }



        setFilteredFavorites(f => allFavorites.filter(m => m.Title.toLowerCase().includes(searchRef.current!.value)))

    }

    useEffect(() => {
        const scrollEvent = () => {
            let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
            if (data?.length && window.scrollY >= maxScrollY && !isLoading) {
                setCurrPage(pg => pg + 1);
            }
        }

        document.addEventListener('scrollend', scrollEvent);

        return () => document.removeEventListener('scrollend', scrollEvent);
    }, [allFavorites])

    useEffect(() => {
        refetch().then((f) => {
            if (f.data?.length) {
                const newFavs = [...allFavorites, ...f.data];
                setAllFavorites(newFavs);
                setFilteredFavorites(newFavs);
            }
        })
    }, [currPage]);

    return <PageSkeleton>
        <Container className="flex flex-col gap-[1em] ml-[2ch] max-[1080px]:ml-[auto]">

            <SearchBar ref={searchRef} triggerFormEvent={filterResults} />

            <MoviesGrid movieList={filteredFavorites} />

            {
                data?.length && data.length >= 10 && !isRefetching ? <div className="text-[1.5em] mt-[1em] text-center">More results</div>
                    : isRefetching ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[1em]">
                        <i className="bi bi-arrow-repeat text-[10em]"></i>
                    </div> : <div className="mb-[2em]"></div>
            }

            {
                error ? <div className="text-[1.5em] mt-[1em] text-center">Error: {error.message + ''}</div> : <></>
            }

        </Container>
    </PageSkeleton>

}