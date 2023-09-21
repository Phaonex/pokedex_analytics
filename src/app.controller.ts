import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PockeApiService } from './services/pocke-api/pocke-api.service';
import { string } from '@stdlib/stdlib';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly pockeService: PockeApiService) {}

  @Get(".")
  getHomeList(): any {
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT 100`,
      // Location must match that of the dataset(s) referenced in the query.
      location: "EU",
    });
    
  }

  @Get("pokemon/")
  getPokemonsList(): any {
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex`,
      // Location must match that of the dataset(s) referenced in the query.
      location: "EU",
    });
    
  }

  @Get("pokemon/:limit")
  getPokemonsListLimited(@Param('limit') limit: number): any {
    console.log(limit)
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT ${limit}`,
      // Location must match that of the dataset(s) referenced in the query.
      location: "EU",
    });
    
  }

  @Get("pokemon/pokedex/:id")
  getPokemonsDetailList(@Param("id") id: string): any {
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations WHERE pokedex_number = ${id}`,
      // Location must match that of the dataset(s) referenced in the query.
      location: "EU",
    });
    
  }
}
