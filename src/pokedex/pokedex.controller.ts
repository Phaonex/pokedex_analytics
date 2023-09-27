import { Controller, Get, Param, UseFilters, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { PokedexExceptionFilter } from 'src/exceptions/pokedex.exceptions';
import {
  PokedexValidationPipe,
  pokemonByIdSchema,
  requestPokedexdDto,
  requestPokemonNamedDto,
} from 'src/pipes/validations/pokedex/pokedex.validation/pokedex.validation.pipe';
import { PockeApiService } from 'src/services/pocke-api/pocke-api.service';

@UseFilters(new PokedexExceptionFilter())
@Controller('pokedex')
export class PokedexController {
  constructor(private readonly pockeApiService: PockeApiService) {}

  @Get('')
  getPokedexList(): Observable<any[]> {
    return this.pockeApiService.queryRows({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations LIMIT 1`,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'EU',
    });
  }
  @Get('id/:id')
  @UsePipes(new PokedexValidationPipe(pokemonByIdSchema))
  getPokemonsDetailById(
    @Param('id') id: requestPokedexdDto,
  ): Observable<any[]> {
    return this.pockeApiService.queryRows({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations WHERE pokedex_number = ${id}`,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'EU',
    });
  }

  @Get('name/:name')
  @UsePipes(new PokedexValidationPipe(pokemonByIdSchema))
  getPokemonsDetailByName(
    @Param('name') name: requestPokemonNamedDto,
  ): Observable<any[]> {
    return this.pockeApiService.queryRows({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.detail_infomations WHERE name = ${name}`,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'EU',
    });
  }
}
