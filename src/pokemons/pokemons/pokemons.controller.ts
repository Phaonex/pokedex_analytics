import { Controller, Get, Param, UseFilters, UsePipes } from '@nestjs/common';
import { PockeApiService } from '../../services/pocke-api/pocke-api.service';
import { HttpExceptionFilter } from '../../exceptions/httpException.filter';
import { PokemonExceptionFilter } from '../../exceptions/pokemon.exceptions';
import { PokemonPipe, pokemonByLimitSchema, requestPokemonByLimitDto } from 'src/pipes/validations/pokemon/pokemon/pokemon.validation.pipe';

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
    
    @Get("/:limit")
    @UseFilters(new PokemonExceptionFilter)
    @UsePipes(new PokemonPipe(pokemonByLimitSchema))
    getPokemonsListLimited(@Param('limit') limit: requestPokemonByLimitDto): any {
      console.dir(limit)
      return this.pockeApiService.queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT ${limit}`,
        // Location must match that of the dataset(s) referenced in the query.
        location: "EU",
      })
      
    }
  }
