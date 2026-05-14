import {
  Controller,
  Get,
  Param,
  Request,
  UseFilters,
  UsePipes
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  PokemonValidationPipe,
  pokemonByGenerationSchema,
  pokemonByLimitSchema,
  pokemonByTypesSchema,
  requestPokemonByLimitDto,
  requestPokemonByNametDto,
  requestPokemonByTypesDto,
  requestPokemonsDto,
} from 'src/pipes/validations/pokemon/pokemon/pokemon.validation.pipe';
import { HttpExceptionFilter } from '../../exceptions/httpException.filter';
import { PokemonExceptionFilter } from '../../exceptions/pokemon.exceptions';
import { PockeApiService } from '../../services/pocke-api/pocke-api.service';
import { requestPokemonByIdDto,} from 'src/pipes/validations/pokedex/pokedex.validation/pokedex.validation.pipe';

@UseFilters(HttpExceptionFilter)
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pockeApiService: PockeApiService) {}
  readonly columns = "int64_field_0, image_url, Id, Names, Type1, Type2, Total, HP ,Attack, Defense, Sp__Atk, Sp__Def ,Speed"
  
  @Get('')
  getHomeList(): any {
    return this.pockeApiService.queryRows({
      query: `SELECT * FROM \`cloud-run-pokedex.pokemons.pokedex\``,
      location: 'EU',
    });
  }

  @Get('/limit/:limit')
  @UsePipes(new PokemonValidationPipe(pokemonByLimitSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListLimited(
    @Request() request: { params: requestPokemonByLimitDto },
  ): Observable<any> {
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` LIMIT ${request.params.limit}`,
        location: 'EU',
      })
  }

  @Get('/id/:id')
  @UsePipes(new PokemonValidationPipe(pokemonByLimitSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsById(
    @Request() request: { params: requestPokemonByIdDto },
  ): Observable<any> {
    console.log(request.params);
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` WHERE Id = ${request.params.id}`,
        location: 'EU',
      })
  }

  @Get('/name/:name')
  @UsePipes(new PokemonValidationPipe(pokemonByTypesSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListByName(
    @Request() request: { params: requestPokemonByLimitDto & requestPokemonByNametDto },
  ): Observable<any> {
    console.log(request.params);
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` WHERE Names = '${request.params?.name}'`,
        location: 'EU',
      })
  }

  @Get('/types/type1/:Type1/:limit')
  @UsePipes(new PokemonValidationPipe(pokemonByTypesSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListByTypes1Limited(
    @Request() request: { params: requestPokemonByLimitDto & requestPokemonByTypesDto },
  ): Observable<any> {
    console.log(request.params);
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` WHERE Type1 = '${request.params?.Type1}' LIMIT ${request.params.limit}`,
        location: 'EU',
      })
  }

  @Get('/types/type2/:Type2/:limit')
  @UsePipes(new PokemonValidationPipe(pokemonByTypesSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListByTypes2Limited(
    @Request() request: { params: requestPokemonByLimitDto & requestPokemonByTypesDto },
  ): Observable<any> {
    console.log(request.params);
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` WHERE Type2 = '${request.params?.Type2}' LIMIT ${request.params.limit}`,
        location: 'EU',
      })
  }

  @Get('/types/:Type1/:Type2/:limit')
  @UsePipes(new PokemonValidationPipe(pokemonByTypesSchema))
  @UseFilters(PokemonExceptionFilter)
  getPokemonsListByTypesLimited(
    @Request() request: { params: requestPokemonByLimitDto & requestPokemonByTypesDto },
  ): Observable<any> {
    console.log(request.params);
    return this.pockeApiService
      .queryRows({
        query: `SELECT ${this.columns} FROM \`cloud-run-pokedex.pokemons.pokedex\` WHERE Type1 = '${request.params?.Type1}' AND Type2 = '${request.params?.Type2}' LIMIT ${request.params.limit}`,
        location: 'EU',
      })
  }

  @Get('/generation/:generation/:limit')
@UsePipes(new PokemonValidationPipe(pokemonByGenerationSchema))
@UseFilters(PokemonExceptionFilter)
getPokemonsListByGenerationLimited(
  // Use @Param() directly on the object. 
  // This will result in: { generation: "1", limit: "10" }
  @Param() params: requestPokemonByLimitDto & requestPokemonsDto,
): Observable<any> {
  
  console.log(params); // Now 'params' is the object Zod was looking for!

  const sqlQuery = `
    SELECT 
      p.int64_field_0, p.image_url, p.Id, p.Names, p.Type1, p.Type2, p.Total, p.HP, p.Attack, p.Defense, p.Sp__Atk, p.Sp__Def, p.Speed, d.generation 
    FROM \`cloud-run-pokedex.pokemons.detail_infomations\` as d
    JOIN \`cloud-run-pokedex.pokemons.pokedex\` as p ON d.pokedex_number = p.Id 
    WHERE d.generation = @genValue 
    LIMIT @limitValue`;

  return this.pockeApiService.queryRows({
    query: sqlQuery,
    params: {
      // Ensure these are cast to numbers if your DTO/Schema hasn't coerced them yet
      genValue: Number(params.generation),
      limitValue: Number(params.limit)
    },
    location: 'EU',
  });
}

}
