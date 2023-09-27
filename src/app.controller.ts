import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/httpException.filter';

@UseFilters(new HttpExceptionFilter)
@Controller()
export class AppController {
  constructor() {}

  @Get("")
  getHome(): any {
    return "<h1>Welcome to pokemon analytics API!</h1> <p>Make a quest to pokemons or pokedex</p>"
  }
}
