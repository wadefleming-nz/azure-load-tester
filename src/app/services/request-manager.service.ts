import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, timer, combineLatest, Observable } from 'rxjs';
import {
    switchMap,
    catchError,
    filter,
    map,
    tap,
    share,
    takeWhile,
    scan,
} from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';
import { FunctionStartResponse } from '../models/function-start-response.model';
import { FunctionStatusResponse } from '../models/function-status-response.model';
import { Activity } from '../models/activity.model';
import { RequestMetrics } from '../models/request-metrics.model';

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

    constructor(private http: HttpClient) {
        this.testInstanceResults$.subscribe((x) =>
            console.log(JSON.stringify(x))
        );
    }

    getResults(numRequests: number, requestUrl: string) {
        const requests$ = Array.from(Array(numRequests), (_, i) =>
            this.createRequestObservable(i + 1, requestUrl)
        );
        return combineLatest(requests$);
    }

    createRequestObservable(
        id: number,
        requestUrl: string
    ): Observable<Activity> {
        return of([id]).pipe(
            switchMap(() =>
                this.startFunction(requestUrl).pipe(
                    switchMap((startResponse) =>
                        this.pollFunctionUntilComplete(
                            startResponse.statusQueryGetUri
                        )
                    ),
                    scan<unknown, RequestMetrics>(
                        (acc) => ({
                            ...acc,
                            endTime: new Date(),
                        }),
                        {
                            requestId: id,
                            startTime: new Date(),
                            currTime: new Date(),
                        }
                    ),
                    map((metrics) => ({
                        requestId: metrics.requestId,
                        duration: this.getElapsedSecondsBetween(
                            metrics.startTime,
                            metrics.currTime
                        ),
                    }))
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

    private getElapsedSecondsBetween(date1: Date, date2: Date) {
        const milliSecondsDiff = date2.getTime() - date1.getTime();
        return milliSecondsDiff / 1000;
    }
}
