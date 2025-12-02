import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PockeApiService } from './services/pocke-api/pocke-api.service';
import { HttpModule } from '@nestjs/axios';
import { PokedexController } from './pokedex/pokedex.controller';
import { PokemonsController } from './pokemons/pokemons/pokemons.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, PokemonsController, PokedexController],
  providers: [ PockeApiService],
})
export class AppModule {}
