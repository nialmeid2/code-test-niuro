import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

    constructor(private readonly httpService: HttpService) {}

    async getMovieById(imdbId: string) {
        try {           
            const response = await firstValueFrom(
                this.httpService.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.API_KEY}`, {
                    timeout: 5000, // 5 second timeout
                })
            );

            return response.data;
        } catch (err) {
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
                    message: 'Internal server error',
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }        
    }

    async getMovies(search: string, page = 1): Promise<any> {
        try {           
            const response = await firstValueFrom(
                this.httpService.get(`https://www.omdbapi.com/?s=${search}&page=${page}&apikey=${process.env.API_KEY}&type=movie`, {
                    timeout: 5000, // 5 second timeout
                })
            );

            return response.data;
        } catch (err) {
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
                    message: 'Internal server error',
                    timestamp: new Date().toISOString()
                },
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
