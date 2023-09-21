import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PockeApiService } from './services/pocke-api/pocke-api.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly pockeService: PockeApiService) {}

  @Get('.')
  getHomeList(): any {
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT 10`,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'EU',
    });
    
  }

  @Get('pokemon/')
  getPokemonsList(): any {
    return this.pockeService.catchThemAll({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT 10`,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'EU',
    });
    
  }
}
