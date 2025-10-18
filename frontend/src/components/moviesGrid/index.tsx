import { Movie } from "@/src/model/Movie";
import MovieCard from "../movieCard";


export default function MoviesGrid({movieList} : {
    movieList: Movie[]
}) {
    return <section className="grid grid-cols-4 gap-[2ch] max-[1080px]:grid-cols-3 max-[675px]:grid-cols-2 max-[420px]:grid-cols-1">
        {movieList?.map((mv) => <MovieCard key={mv.imdbID} movie={mv} />)}
    </section>
}