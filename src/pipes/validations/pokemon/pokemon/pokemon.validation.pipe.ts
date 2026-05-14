import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodObject, z } from 'zod';

@Injectable()
export class PokemonValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (result.success) {
      return result.data;
    }
    throw result.error;
  }
}

export const pokemonsSchema = z.object({
  int64_field_0: z.number(),
  generation: z.number(),
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
  Speed: z.number(),
});

export const pokemonByIdSchema = z.object({
  id: z.coerce.number(),
});

export const pokemonByTypesSchema = z.object({
  Type1: z.string(),
  Type2: z.string(),
});

export const pokemonByNameSchema = z.object({
  name: z.string(),
});

export const pokemonByLimitSchema = z.object({
  limit: z.coerce.number(),
});

export const pokemonByGenerationSchema = z.object({
  generation: z.coerce.number(),
  limit: z.coerce.number(),
});

export type requestPokemonsDto = z.infer<typeof pokemonsSchema>;
export type requestPokemonByNametDto = z.infer<typeof pokemonByNameSchema>;
export type requestPokemonByIdDto = z.infer<typeof pokemonByIdSchema>;
export type requestPokemonByTypesDto = z.infer<typeof pokemonByTypesSchema>;
export type requestPokemonByLimitDto = z.infer<typeof pokemonByLimitSchema>;
