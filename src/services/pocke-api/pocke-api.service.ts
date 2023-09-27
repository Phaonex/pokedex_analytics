import { BigQuery, Query } from '@google-cloud/bigquery';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Observable,
  catchError,
  firstValueFrom,
  from,
  lastValueFrom,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class PockeApiService {
  readonly bigquery: BigQuery;
  readonly projectId = 'cloud-run-pokedex';
  readonly DatasetId = 'pokemons';
  readonly options = { maxResults: 10 };

  constructor(private readonly httpService: HttpService) {
    this.bigquery = new BigQuery();
  }
  // catch Them All! ;-)
  queryRows(query: Query): Observable<any> {
    const projectId = this.projectId;
    const bigquery = this.bigquery;

    async function queryPokemon(
      query: Query = { query: '', location: '', projectId: projectId },
    ): Promise<any> {
      // Run the query if there is no error catch.
      try {
        const [rows] = await bigquery.query(query);
        return rows ?? [];
      } catch (error) {
        throw new HttpException(
          error.response.status.errorResult,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return from(queryPokemon(query));
  }
}
