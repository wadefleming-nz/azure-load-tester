import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError, filter, map, share } from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';
import { SolveStartResponse } from '../models/solve-start-response.model';

@Injectable({
    providedIn: 'root',
})
export class RequestManagerService {
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResult$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) =>
            this.http
                .get<SolveStartResponse>(ti.endpointUrl)
                .pipe(map((result) => JSON.stringify(result)))
        ),
        catchError((err) => of(`Error: ${JSON.stringify(err)}`)),
        share()
    );

    constructor(private http: HttpClient) {}
}
