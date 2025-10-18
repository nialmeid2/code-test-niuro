"use client"

import { DataContext } from "@/src/context/DataContext"
import { Movie } from "@/src/model/Movie"
import Link from "next/link"
import { useContext } from "react"


export default function MovieCard({movie} : {
    movie: Movie
}) {

    const { favorites, addFavorite, removeFavorite} = useContext(DataContext);

    return <div className="flex flex-col gap-[1em] p-[1em] rounded-[.5em] bg-indigo-300 dark:bg-indigo-900 justify-between">
        <Link href={`/details?id=${movie.imdbID}`} className="hover:underline">
            <h2 className="font-bold text-[1.25em] text-center">{movie.Title}</h2>
        </Link>
        <Link href={`/details?id=${movie.imdbID}`}><img src={movie.Poster} alt={`${movie.Title} Poster`} /></Link>
        <section className="flex justify-between items-center">
            <span>{movie.Year}</span> 
            <button className="flex items-center justify-center cursor-pointer" title="Click to favorite this movie" 
                onClick={() => !favorites[movie.imdbID] ? addFavorite(movie) : removeFavorite(movie.imdbID)}>
                <i className={`bi bi-star-fill ${favorites[movie.imdbID] ? 'text-yellow-300' : 'text-neutral-600 dark:text-neutral-300'} text-[1.5em] `}></i>
            </button>                   
        </section>
    </div>
}