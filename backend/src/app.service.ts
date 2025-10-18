import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import db from './db';
import { DetailedMovie, Movie } from './Movie';

@Injectable()
export class AppService {

    constructor(private readonly httpService: HttpService) {}

    async getFavorites(page: number) {
        try {

            const favs = await db.favorite.findMany({
                skip: (page - 1) * 10,
                take: 10
            });

            return favs;

        } catch(err)  {
            console.log(err)
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );            
        }     
    }

    async checkIfFavorites(ids: string[]) {
        try {

            return await db.favorite.findMany({
                where: {imdbID: { in: ids } }
            })

        } catch(err)  {
            console.log(err)
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );            
        }                 
    }

    async addFavorite(id: string) {
        try {

            const theMovie = await this.getMovieById(id);

            if (!theMovie)
                return;

            

            const created = await db.favorite.create({
                data: {
                    imdbID: theMovie.imdbID,
                    Poster: theMovie.Poster,
                    Title: theMovie.Title,
                    Year: +theMovie.Year,
                    isFavorite: true
                }
            })

            return created;

        } catch(err)  {
            console.log(err)
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );            
        }  
    }

    async removeFavorite(id: string) {
        try {

            await db.favorite.delete({
                where: { imdbID: id }
            })

            return { msg: "Removed Sucessfully" }

        } catch(err)  {
            console.log(err)
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );            
        }        
    }

    async getMovieById(imdbId: string) {
        try {           
            const response = await firstValueFrom<{data: DetailedMovie}>(
                this.httpService.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.API_KEY}`, {
                    timeout: 5000, // 5 second timeout
                })
            );
                      
            if (!response.data)
                return response.data;

            const isFav = await this.checkIfFavorites([response.data.imdbID]);

            response.data.isFavorite = !!isFav.length;
            return response.data;
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                throw new HttpException(
                    {
                        status: 'error',
                        message: `External API error: ${err.message}`,
                        statusCode: err.response?.status || HttpStatus.BAD_GATEWAY,
                        timestamp: new Date().toISOString()
                    },
                    HttpStatus.BAD_GATEWAY
                );
            }
            
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }        
    }

    async getMovies(search: string, page = 1): Promise<any> {
        try {           
            const response = await firstValueFrom<{data: { Search: Movie[], totalResults: number }}>(
                this.httpService.get(`https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${process.env.API_KEY}&type=movie`, {
                    timeout: 5000, // 5 second timeout
                })
            );

            if (!response.data?.Search?.length)
                return response.data;

            const favList = await this.checkIfFavorites(response.data.Search.map(s => s.imdbID))

            response.data.Search = response.data.Search.map((s) => {
                s.isFavorite = favList.some((f) => f.imdbID == s.imdbID)
                return s;
            })

            return response.data;
        } catch (err) {
            console.log(err)
            if (err instanceof AxiosError) {
                throw new HttpException(
                    {
                        status: 'error',
                        message: `External API error: ${err.message}`,
                        statusCode: err.response?.status || HttpStatus.BAD_GATEWAY,
                        timestamp: new Date().toISOString()
                    },
                    HttpStatus.BAD_GATEWAY
                );
            }
            
            throw new HttpException(
                {
                    status: 'error',
                    message: `Internal server error ${err.message}`,
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
