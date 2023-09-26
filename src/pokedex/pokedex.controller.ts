import { Controller, Get, HttpException, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { PokedexExceptionFilter } from 'src/exceptions/pokedex.exceptions';
import { PockeApiService } from 'src/services/pocke-api/pocke-api.service';

@UseFilters(new PokedexExceptionFilter)
@Controller("pokedex")
export class PokedexController {
    constructor(private readonly pockeApiService: PockeApiService){}

    @Get("")
    getPokedexList(): Observable<any[]> {
        return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations LIMIT 1`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
        });
        
    }

    @Get("id/:id")
    getPokemonsDetailById(@Param("id") id: number): Observable<any[]> {
      return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations WHERE pokedex_number = ${id}`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
      }).pipe(tap(v => {  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }))
      
    }

    @Get("name/:name")
    getPokemonsDetailByName(@Param("name") name: string): Observable<any[]> {
      return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations WHERE name = ${name}`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
      }).pipe(tap(v => {  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }))
      
    }   
}
