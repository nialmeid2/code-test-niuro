import { Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';



@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get("/movies")
    getMoviesBySearch(@Query('search') search: string): Promise<any> {
        return this.movieService.getMovies(search, 1);
    }

    @Get("/movies/:page")
    getNextPage(@Query('search') search: string, @Param('page', ParseIntPipe) page: number): Promise<any> {
        return this.movieService.getMovies(search, page);
    }

    @Get("/movie/:id")
    getMovieDetails(@Param("id") imdbId: string): Promise<any> {
        return this.movieService.getMovieById(imdbId);
    }

    @Get('/favorites')
    getFavorites() {
        return this.movieService.getFavorites(1);        
    }

    @Get('/favorites/:page')
    getFavoritesNextPage(@Param("page", ParseIntPipe) page) {
        return this.movieService.getFavorites(page);        
    }

    @Post('/favorite/:id')
    addFavorite(@Param('id') id: string) {
        return this.movieService.addFavorite(id);        
    }

    @Delete('/favorite/:id')
    removeFavorite(@Param('id') id: string) {
        return this.movieService.removeFavorite(id);        
    }



}
