import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get("/movies")
    getMoviesBySearch(@Query('search') search: string): Promise<any> {
        return this.appService.getMovies(search, 1);
    }

    @Get("/movies/:page")
    getNextPage(@Query('search') search: string, @Param('page', ParseIntPipe) page: number): Promise<any> {
        return this.appService.getMovies(search, page);
    }

    @Get("/movie/:id")
    getMovieDetails(@Param("id") imdbId: string): Promise<any> {
        return this.appService.getMovieById(imdbId);
    }

}
