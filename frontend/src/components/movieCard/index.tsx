"use client"

import { DataContext } from "@/src/context/DataContext"
import { Movie } from "@/src/model/Movie"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"


export default function MovieCard({ movie }: {
    movie: Movie
}) {

    //const { favorites, addFavorite, removeFavorite} = useContext(DataContext);

    const [isFavorite, setIsFavorite] = useState(movie.isFavorite);

    const { mutate: performAdd, isPending } = useMutation({
        mutationKey: ['Favorite', 'add'],
        mutationFn: createMovie
    });

    const { mutate: performRemove, isPending: isPendingDelete } = useMutation({
        mutationKey: ['Favorite', 'remove'],
        mutationFn: removeMovie
    });

    async function createMovie(id: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}favorite/${id}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to create movie');
        }

        return response.json();
    };

    async function removeMovie(id: string) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}favorite/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to create movie');
        }

        return response.json();
    };


    useEffect(() => {
        setIsFavorite(movie.isFavorite)
    }, [movie]);


    function addFavorite(movie: Movie) {
        performAdd(movie.imdbID, {
            onSuccess: () => {
                setIsFavorite(f => true)
            }
        })
    }

    function removeFavorite(movie: Movie) {
        performRemove(movie.imdbID, {
            onSuccess: () => {
                setIsFavorite(f => false)
            }
        })
    }


    return <div className="flex flex-col gap-[1em] p-[1em] rounded-[.5em] bg-indigo-300 dark:bg-indigo-900 justify-between">
        <Link href={`/details?id=${movie.imdbID}`} className="hover:underline">
            <h2 className="font-bold text-[1.25em] text-center">{movie.Title}</h2>
        </Link>
        <Link href={`/details?id=${movie.imdbID}`}><img src={movie.Poster} alt={`${movie.Title} Poster`} className="w-[100%]" /></Link>
        <section className="flex justify-between items-center">
            <span>{movie.Year}</span>
            <button className="flex items-center justify-center cursor-pointer" title="Click to favorite this movie"
                onClick={() => isPending || isPendingDelete ? "" : !isFavorite ? addFavorite(movie) : removeFavorite(movie)}>
                <i className={`bi ${isPending || isPendingDelete ? 'bi-arrow-repeat animate-spin' : 
                    'bi-star-fill'} ${isFavorite ? 'text-yellow-300' : 'text-neutral-600 dark:text-neutral-300'} text-[1.5em] `}></i>
            </button>
        </section>
    </div>
}