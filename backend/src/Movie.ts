// Movies returned by the backend will have this structure
export interface Movie {
    imdbID: string,
    Title: string,
    Year: number,
    Poster: string
}

export interface DetailedMovie extends Movie {
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Ratings: {
        Source: string,
        Value: string
    }[],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string
}