import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError, filter, map, share } from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';
import { FunctionStartResponse } from '../models/function-start-response.model';
import { FunctionStatusResponse } from '../models/function-status-response.model';

@Injectable({
    providedIn: 'root',
})
export class RequestManagerService {
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResult$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) =>
            this.http
                .get<FunctionStartResponse>(ti.endpointUrl)
                .pipe(
                    switchMap((startResponse) =>
                        this.pollStatus(startResponse.statusQueryGetUri)
                    )
                )
        ),
        catchError((err) => of(`Error: ${JSON.stringify(err)}`)),
        share()
    );

    pollStatus(statusUrl: string) {
        return this.http
            .get<FunctionStatusResponse>(statusUrl)
            .pipe(map((statusResponse) => statusResponse.runtimeStatus));
    }

    constructor(private http: HttpClient) {}
}
