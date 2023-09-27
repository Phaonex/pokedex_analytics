import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodObject, z } from 'zod';

@Injectable()
export class PokemonPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>){}
  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value)

   if (!result.success){
    result
   }else{
    result.data
   }
   return value
  }
}

export const pokemonsSchema = z
  .object({
    int64_field_0: z.number(),
    image_url: z.string(),
    Id: z.number(),
    Names: z.string(),
    Type1: z.string(),
    Type2: z.string(),
    Total: z.number(),
    HP: z.number(),
    Attack: z.number(),
    Defense: z.number(),
    Sp__Atk: z.number(),
    Sp__Def: z.number(),
    Speed: z.number()
  })

export const pokemonByLimitSchema = z
  .object({
    limit: z.number()
  })

export const pokemonByIdSchema = z
  .object({
    id: z.number()
  })

  export const pokemonByNameSchema = z
  .object({
    name: z.string()
  })

export type requestPokemonByLimitDto = z.infer<typeof pokemonByLimitSchema>
export type requestPokemonsDto = z.infer<typeof pokemonsSchema>
export type requestPokemonByIdDto = z.infer<typeof pokemonByIdSchema>
export type requestPokemonNamedDto = z.infer<typeof pokemonByNameSchema>