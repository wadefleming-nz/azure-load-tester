import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, timer, combineLatest } from 'rxjs';
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
    statusPollDelay = 3 * 1000;
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResults$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) => this.getResults(ti.numRequests, ti.endpointUrl)),
        share()
    );

    getResults(numRequests: number, requestUrl: string) {
        const requests$ = Array.from(Array(numRequests), (_, i) =>
            this.createRequestObservable(i + 1, requestUrl)
        );
        return combineLatest(requests$);
    }

    createRequestObservable(id: number, requestUrl: string) {
        return of([id]).pipe(
            switchMap(() =>
                this.startFunction(requestUrl).pipe(
                    switchMap((startResponse) =>
                        this.pollFunctionUntilComplete(
                            startResponse.statusQueryGetUri
                        )
                    ),
                    map((status) => ({ id, status: status }))
                )
            )
        );
    }

    startFunction(functionUrl: string) {
        return this.http.get<FunctionStartResponse>(functionUrl);
    }

    pollFunctionUntilComplete(statusUrl: string) {
        return timer(0, this.statusPollDelay).pipe(
            switchMap(() => this.getStatus(statusUrl)),
            takeWhile((status) => status != 'Completed', true)
        );
    }

    getStatus(statusUrl: string) {
        return this.http
            .get<FunctionStatusResponse>(statusUrl)
            .pipe(map((statusResponse) => statusResponse.runtimeStatus));
    }

    constructor(private http: HttpClient) {
        this.testInstanceResults$.subscribe((x) =>
            console.log(JSON.stringify(x))
        );
    }
}
