import { Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
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

    @Get('/favorites')
    getFavorites() {
        return this.appService.getFavorites(1);        
    }

    @Get('/favorites/:page')
    getFavoritesNextPage(@Param("page", ParseIntPipe) page) {
        return this.appService.getFavorites(page);        
    }

    @Post('/favorite/:id')
    addFavorite(@Param('id') id: string) {
        return this.appService.addFavorite(id);        
    }

    @Delete('/favorite/:id')
    removeFavorite(@Param('id') id: string) {
        return this.appService.removeFavorite(id);        
    }



}
