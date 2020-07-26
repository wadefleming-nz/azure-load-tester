import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, interval } from 'rxjs';
import {
    switchMap,
    catchError,
    filter,
    map,
    share,
    takeWhile,
} from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';
import { FunctionStartResponse } from '../models/function-start-response.model';
import { FunctionStatusResponse } from '../models/function-status-response.model';

@Injectable({
    providedIn: 'root',
})
export class RequestManagerService {
    statusPollDelay = 5 * 1000;
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResult$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) =>
            this.startFunction(ti.endpointUrl).pipe(
                switchMap((startResponse) =>
                    this.pollFunctionUntilComplete(
                        startResponse.statusQueryGetUri
                    )
                )
            )
        ),
        catchError((err) => of(`Error: ${JSON.stringify(err)}`)),
        share()
    );

    startFunction(functionUrl: string) {
        return this.http.get<FunctionStartResponse>(functionUrl);
    }

    pollFunctionUntilComplete(statusUrl: string) {
        return interval(this.statusPollDelay).pipe(
            switchMap(() => this.getStatus(statusUrl)),
            takeWhile((status) => status != 'Completed', true)
        );
    }

    getStatus(statusUrl: string) {
        return this.http
            .get<FunctionStatusResponse>(statusUrl)
            .pipe(map((statusResponse) => statusResponse.runtimeStatus));
    }

    constructor(private http: HttpClient) {}
}
