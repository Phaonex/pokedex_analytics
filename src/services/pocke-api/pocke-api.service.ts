import { BigQuery } from '@google-cloud/bigquery';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
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

    findAll(): Observable<AxiosResponse<[]> > {
        return this.httpService.get("https://pokeapi.co/api/v2/pokemon/?limit=151").pipe( map(res => res.data)).pipe(
            catchError(() => {
              throw new ForbiddenException('API not available');
            }),
          );
    }

    catchThemAll(options): Observable<any> {
        const projectId = this.projectId;
        const bigquery = this.bigquery;

        async function queryPokemon(options = {query: "", location: ""}) {
        
            const [datasets] = await bigquery.getDatasets({projectId});
            // Run the query
            const [rows] = await bigquery.query(options);
            return rows

        }
        
        return of(queryPokemon(options));
    }

    list() {

            const projectId = this.projectId;
            const bigquery = this.bigquery;

            async function listDatasets() {
            
                const [datasets] = await this.bigquery.getDatasets({projectId});
                const [tables] = await this.bigquery.getDatasets({projectId});
                // const [jobs] = await bigquery.getJobs(options);

                console.log('Datasets:');
                datasets.forEach(dataset => dataset.getTables().then(t => console.dir(t)));
                // jobs.forEach(jobs => console.log(jobs.id));
            }
            return listDatasets()
    }
}
