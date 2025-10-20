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
    const [movieList, setMovieList] = useState([] as Movie[]);
    const [searchTerm, setSearchTerm] = useState('');
    const [noMovieFound, setNoMovieFound] = useState(false);
    const [scrollEnded, setScrollEnded] = useState(false);


    const { data, isLoading, refetch, isRefetching, error } = useQuery<{ Search: Movie[], totalResults: number }>({
        queryKey: ['movieSearch', 'Page'],
        queryFn: () => fetchMovies({ page: currentPage, term: searchTerm }).then((res) => res.json()),
        enabled: false // to force the movieResults to be rendered only by manually calling refetch
    });

    async function fetchMovies({ page, term }: { page: number, term: string }) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}movies/${page}?search=${term}`);
    }

    const searchRef = useRef<HTMLInputElement>(null);

    function startSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const theTerm = searchRef.current?.value

        if (!theTerm || theTerm == searchTerm)
            return;

        setSearchTerm(theTerm);
        setScrollEnded(false);
        setNoMovieFound(false);
        setMovieList([]);
        setCurrentPage(1); // If user searches something, start over on the first page

    }


    useEffect(() => {

        const scrollEvent = () => {
            let maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
            if (data?.Search?.length && window.scrollY >= maxScrollY && !isLoading) {
                if (movieList.length + data.Search.length < data.totalResults)
                    setCurrentPage(currPage => currPage + 1);
                else
                    setScrollEnded(true);

            }
        }

        document.addEventListener('scrollend', scrollEvent);

        return () => document.removeEventListener('scrollend', scrollEvent)

    }, [data]);

    useEffect(() => {
        // Rendered this way to prevent flicker when rendering new Movies through infinite scrolling
        if (searchTerm)
            refetch().then((stmt) => {
                if (!stmt.data?.Search) {
                    console.log(movieList.length)

                    if (movieList.length == 0)
                        setNoMovieFound(true);
                    return;
                }
                setMovieList(prev => [...prev, ...stmt.data.Search]);
            });
        else
            setMovieList([]);
    }, [searchTerm, currentPage]);


    return <PageSkeleton>
        <Container className="flex flex-col gap-[1em] ml-[2ch] max-[1080px]:ml-[auto]">

            <SearchBar ref={searchRef} triggerFormEvent={startSearch} />

            {
                isLoading || movieList.length ?
                    <section className="w-[100%] p-[1em] px-[0]">

                        {
                            isLoading ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[3em]">
                                <i className="bi bi-arrow-repeat text-[10em]"></i>
                            </div> : <></>
                        }



                        {
                            movieList.length ? <>
                                <MoviesGrid movieList={movieList} />
                                {!scrollEnded && !isRefetching && movieList.length % 10 == 0 ? <div className="text-[1.5em] mt-[2em] text-center my-[1em]">More results</div>
                                    : isRefetching ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[1em]">
                                        <i className="bi bi-arrow-repeat text-[10em]"></i>
                                    </div> : <div className="mb-[2em]"></div>}
                            </> : <></>
                        }


                        {
                            error ? <div className="text-[1.5em] mt-[1em] text-center">Error: {error.message + ''}</div> : <></>
                        }

                    </section>
                    : noMovieFound ? <div className="text-[1.5em] mt-[2em] text-center">
                        No movies found with the keyword <span className="font-bold">{searchTerm}</span>, please try searching something else
                    </div> : <></>
            }

        </Container>
    </PageSkeleton>
}