import { BigQuery, Query } from '@google-cloud/bigquery';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable()
export class PockeApiService {

    readonly bigquery: BigQuery
    readonly projectId: string;
    readonly DatasetId = "pokemons";
    readonly options = {maxResults: 10};

    constructor(private readonly httpService: HttpService){
        this.projectId = "cloud-run-pokedex";
        this.bigquery = new BigQuery();
    }
    // catch Them All! ;-)
    queryRows(query: Query): Observable<any> {
        const projectId = this.projectId;
        const bigquery = this.bigquery;

        async function queryPokemon(query: Query = {query: "", location: ""}) {
            // Run the query
            const [rows] = await bigquery.query(query);
            return rows ?? []
        }
        
        return of(queryPokemon(query)).pipe(map(res => res), catchError(err => {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message',
              }, HttpStatus.FORBIDDEN, {
                cause: err
              });
        }));
    }
    
}
