import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { PockeApiService } from '../../services/pocke-api/pocke-api.service';
import { HttpExceptionFilter } from '../../exceptions/httpException.filter';
import { PokemonExceptionFilter } from '../../exceptions/pokemon.exceptions';

@UseFilters(new HttpExceptionFilter)
@Controller("pokemons")
export class PokemonsController {
    constructor( private readonly pockeApiService: PockeApiService) {}
  
    @Get("")
    getHomeList(): any {
      return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT 100`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
      })
    }
    @UseFilters(new PokemonExceptionFilter)
    @Get("/:limit")
    getPokemonsListLimited(@Param('limit') limit: number): any {
      return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT ${limit}`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
      })
      
    }
  }
