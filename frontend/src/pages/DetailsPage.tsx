"use client"

import { Fragment } from "react";
import Container from "./container";
import PageSkeleton from "./pageSkeleton";
import { DetailedMovie, Movie } from "../model/Movie";
import MovieCard from "../components/movieCard";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";


export default function Details() {

    const searchParams = useSearchParams();

    const { data, isPending, error } = useQuery<DetailedMovie>({
        queryKey: ['movieSearch', 'Details'],
        queryFn: () => fetchMovie({ id: searchParams?.get('id') }).then((res) => res.json()),
        enabled: !!searchParams?.get('id')
    })


    async function fetchMovie({ id }: { id?: string | null }) {
        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}movie/${id}`);
    }

    function infoLine(title: string, info: string, mbClass: string = "mb-[.5em]") {
        if (!info)
            return <></>

        return <p className={`flex ${mbClass} w-[100%]`}>
            <span className="text-blue-900 dark:text-blue-300 font-bold w-[11ch]">{title}{title ? ':' : ''}</span>
            <span className="flex-1">{info}</span>
        </p>
    }


    return <PageSkeleton>
        <Container className="flex max-[1080px]:flex-col gap-[1em] ml-[2ch] mt-[2em]">


            {
                !searchParams?.get('id') ? <div className="text-[1.5em] text-center">No id was provided</div>
                    : error ? <div className="text-[1.5em] text-center">Error: {error.message}</div>
                        : isPending ? <div className="w-[100%] flex items-center justify-center animate-spin mt-[3em]">
                            <i className="bi bi-arrow-repeat text-[10em]"></i>
                        </div> : !data ? <div className="text-[1.5em] text-center">Movie not found</div> : <>
                            <section className="flex gap-[2ch] w-[100%]">
                                <MovieCard movie={data as Movie} />
                                <section className="flex flex-col flex-1">
                                    <div className="flex justify-between items-center mb-[1em]">
                                        <h2 className="font-bold text-[1.5em] underline">{data?.Title}</h2>
                                        <span className={`text-[1.25em] font-bold bg-slate-900 px-[1em] py-[.5em] ${isNaN(+data.imdbRating) ? 'text-white' : 
                                            parseFloat(data.imdbRating) > 7.1 ? 'text-green-200' : parseFloat(data.imdbRating) > 5 ? 'text-yellow-200' :
                                                'text-red-200'}`} title="IMDB Rating">{data.imdbRating}</span>
                                    </div>
                                    {infoLine('Country', data.Country)}
                                    {infoLine('Director', data.Director)}
                                    {infoLine('Writer', data.Writer)}
                                    {infoLine('Runtime', data.Runtime)}
                                    {infoLine('Genre', data.Genre)}
                                    {infoLine('Release', data.Released)}
                                    {infoLine('Plot', data.Plot)}

                                    {data.Ratings && <div className="my-[.7em]">
                                        {data.Ratings.map((r, i) => <Fragment key={r.Source}>
                                            {infoLine(i == 0 ? 'Ratings' : '', `${r.Value} from ${r.Source}`, 'mb-[.2em]')}
                                        </Fragment>)}
                                    </div>}
                                </section>
                            </section>

                        </>

            }


        </Container>
    </PageSkeleton>

}