"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

import PageSkeleton from "./pageSkeleton";
import Container from "./container";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "../model/Movie";
import SearchBar from "../components/searchBar";
import MoviesGrid from "../components/moviesGrid";

export default function SearchPage() {



    const [currentPage, setCurrentPage] = useState(1);
    const [prevResults, setPrevResults] = useState([] as Movie[]);
    const [searchTerm, setSearchTerm] = useState('');
    const [scrollEnded, setScrollEnded] = useState(false);


    const { data, isLoading, refetch, isRefetching, error } = useQuery<{ Search: Movie[], totalResults: number }>({
        queryKey: ['movieSearch', 'Page'],
        queryFn: () => fetchMovies({ page: currentPage, term: searchTerm }).then((res) => res.json()),
        enabled: !!searchTerm
    });

    async function fetchMovies({ page, term }: { page: number, term: string }) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}movies/${page}?search=${term}`);
    }

    const searchRef = useRef<HTMLInputElement>(null);

    function startSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const theTerm = searchRef.current?.value

        if (!theTerm)
            return;

        setSearchTerm(theTerm);
        setScrollEnded(false);
        setPrevResults([]);
        setCurrentPage(1); // If user searches something, start over on the first page

    }

    useEffect(() => {
        searchRef.current!.focus();
        if (data?.Search)
            data.Search = [];
        setPrevResults([]);
    }, [])

    useEffect(() => {


        const scrollEvent = () => {
            let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
            if (data?.Search?.length && window.scrollY >= maxScrollY && !isLoading) {
                setPrevResults(m => [...m, ...data.Search]);
                if (prevResults.length + data.Search.length < data.totalResults)
                    setCurrentPage(currPage => currPage + 1);
                else
                    setScrollEnded(true);

            }
        }

        document.addEventListener('scrollend', scrollEvent);

        return () => document.removeEventListener('scrollend', scrollEvent)

    }, [data]);

    useEffect(() => {
        if (searchTerm)
            refetch()
    }, [searchTerm, currentPage]);


    return <PageSkeleton>
        <Container className="flex flex-col gap-[1em] ml-[2ch] max-[1080px]:ml-[auto]">

            <SearchBar ref={searchRef} triggerFormEvent={startSearch} />

            {
                isLoading || data?.Search?.length ?
                    <section className="w-[100%] p-[1em] px-[0]">

                        {
                            isLoading ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[3em]">
                                <i className="bi bi-arrow-repeat text-[10em]"></i>
                            </div> : <></>
                        }

                        {
                            data?.Search ? <>
                                <MoviesGrid movieList={prevResults.concat(data.Search)} />
                                {!scrollEnded ? <div className="text-[1.5em] mt-[1em] text-center">More results</div> : <></>}
                            </> : <></>
                        }

                        {
                            isRefetching ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[3em]">
                                <i className="bi bi-arrow-repeat text-[10em]"></i>
                            </div> : <></>
                        }

                        {
                            error ? <div className="text-[1.5em] mt-[1em] text-center">Error: {error.message + ''}</div> : <></>
                        }

                    </section>
                    : <></>
            }

        </Container>
    </PageSkeleton>
}