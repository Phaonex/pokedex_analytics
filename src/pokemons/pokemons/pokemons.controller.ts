import {
  Controller,
  Get,
  HttpException,
  HttpStatus, Request,
  UseFilters,
  UsePipes
} from '@nestjs/common';
import { PockeApiService } from '../../services/pocke-api/pocke-api.service';
import { HttpExceptionFilter } from '../../exceptions/httpException.filter';
import { PokemonExceptionFilter } from '../../exceptions/pokemon.exceptions';
import {
  PokemonValidationPipe,
  pokemonByLimitSchema,
  requestPokemonByLimitDto,
} from 'src/pipes/validations/pokemon/pokemon/pokemon.validation.pipe';
import { Observable, tap } from 'rxjs';

@UseFilters(HttpExceptionFilter)
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pockeApiService: PockeApiService) {}

  @Get('')
  getHomeList(): any {
    return this.pockeApiService.queryRows({
      query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex`,
      location: 'EU',
    });
  }

  @Get('/:limit')
  @UsePipes(new PokemonValidationPipe(pokemonByLimitSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListLimited(
    @Request() request: { params: requestPokemonByLimitDto },
  ): Observable<any> {
    return this.pockeApiService
      .queryRows({
        query: `SELECT * FROM cloud-run-pokedex.pokemons.pokedex LIMIT ${request.params.limit}`,
        location: 'EU',
      })
  }
}
