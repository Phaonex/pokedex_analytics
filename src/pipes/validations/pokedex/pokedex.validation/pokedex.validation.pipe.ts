import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodObject, z } from 'zod';

@Injectable()
export class PokedexValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      result;
    } else {
      result.data;
    }
    return value;
  }
}

export const pokedexSchema = z.object({
  int64_field_0: z.number(),
  pokedex_number: z.number(),
  name: z.string(),
  german_name: z.string(),
  japanese_name: z.string(),
  generation: z.number(),
  status: z.string(),
  species: z.string(),
  type_number: z.number(),
  type_1: z.string(),
  type_2: z.string(),
  height_m: z.number(),
  weight_kg: z.number(),
  abilities_number: z.number(),
  ability_1: z.string(),
  ability_2: z.string() ?? null,
  ability_hidden: z.string(),
  total_points: z.number(),
  hp: z.number(),
  attack: z.number(),
  defense: z.number(),
  sp_attack: z.number(),
  sp_defense: z.number(),
  speed: z.number(),
  catch_rate: z.number(),
  base_friendship: z.number(),
  base_experience: z.number(),
  growth_rate: z.string(),
  egg_type_number: z.number(),
  egg_type_1: z.string(),
  egg_type_2: z.string(),
  percentage_male: z.number(),
  egg_cycles: z.number(),
  against_normal: z.number(),
  against_fire: z.number(),
  against_water: z.number(),
  against_electric: z.number(),
  against_grass: z.number(),
  against_ice: z.number(),
  against_fight: z.number(),
  against_poison: z.number(),
  against_ground: z.number(),
  against_flying: z.number(),
  against_psychic: z.number(),
  against_bug: z.number(),
  against_rock: z.number(),
  against_ghost: z.number(),
  against_dragon: z.number(),
  against_dark: z.number(),
  against_steel: z.number(),
  against_fairy: z.number(),
});

export const pokemonByIdSchema = z.object({
  id: z.number(),
});

export const pokemonByNameSchema = z.object({
  name: z.string(),
});

export type requestPokedexdDto = z.infer<typeof pokedexSchema>;
export type requestPokemonByIdDto = z.infer<typeof pokemonByIdSchema>;
export type requestPokemonNamedDto = z.infer<typeof pokemonByNameSchema>;
