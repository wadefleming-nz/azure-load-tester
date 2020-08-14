import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of, timer, combineLatest, Observable } from 'rxjs';
import {
    switchMap,
    filter,
    map,
    share,
    takeWhile,
    scan,
    withLatestFrom,
} from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';
import { FunctionStartResponse } from '../models/function-start-response.model';
import { FunctionStatusResponse } from '../models/function-status-response.model';
import { Activity } from '../models/activity.model';
import { RequestMetrics } from '../models/request-metrics.model';
import { getElapsedSecondsBetween } from '../utils/time.utils';
import { FunctionStatus } from '../enums/function-status.enum';

@Injectable({
    providedIn: 'root',
})
export class RequestManagerService {
    statusPollDelay = 3 * 1000;
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResults$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) =>
            this.getResults(ti.numRequests, ti.endpointUrl, ti.payload)
        ),
        share()
    );

    allCompleted$ = this.testInstanceResults$.pipe(
        map((activities) =>
            activities.every((a) => a.status === FunctionStatus.Completed)
        )
    );

    constructor(private http: HttpClient) {}

    getResults(numRequests: number, requestUrl: string, payload: string) {
        const requests$ = Array.from(Array(numRequests), (_, i) =>
            this.createRequestObservable(i + 1, requestUrl, payload)
        );
        return combineLatest(requests$);
    }

    createRequestObservable(
        id: number,
        requestUrl: string,
        payload: string
    ): Observable<Activity> {
        return of([id]).pipe(
            switchMap(() => {
                const startFunctionResponse$ = this.startFunction(
                    requestUrl,
                    payload
                );
                return startFunctionResponse$.pipe(
                    switchMap((startResponse) =>
                        this.pollFunctionUntilComplete(
                            startResponse.statusQueryGetUri
                        )
                    ),
                    this.accumulateRequestMetrics(id),
                    withLatestFrom(startFunctionResponse$),
                    this.convertToActivity
                );
            })
        );
    }

    startFunction(functionUrl: string, payload: string) {
        const headers = new HttpHeaders().append(
            'Content-Type',
            'application/json'
        );
        return this.http.post<FunctionStartResponse>(functionUrl, payload, {
            headers,
        });
    }

    // TODO reimplement with startFunctionResponse$ changes
    // pollFunction(startResponse: Observable<FunctionStartResponse>) {
    //     return startResponse.pipe(
    //         switchMap((startResponse) =>
    //             this.pollFunctionUntilComplete(startResponse.statusQueryGetUri)
    //         )
    //     );
    // }

    pollFunctionUntilComplete(statusUrl: string) {
        return timer(0, this.statusPollDelay).pipe(
            switchMap(() => this.getStatus(statusUrl)),
            takeWhile(
                (status) => status.runtimeStatus != FunctionStatus.Completed,
                true
            )
        );
    }

    getStatus(statusUrl: string) {
        return this.http
            .get<FunctionStatusResponse>(statusUrl)
            .pipe(map((statusResponse) => statusResponse));
    }

    accumulateRequestMetrics(id: number) {
        return (statusResponse: Observable<FunctionStatusResponse>) =>
            statusResponse.pipe(
                scan<FunctionStatusResponse, RequestMetrics>(
                    (acc, curr) => ({
                        ...acc,
                        currTime: new Date(),
                        status: curr.runtimeStatus,
                        response: curr,
                    }),
                    {
                        requestId: id,
                        startTime: new Date(),
                        currTime: new Date(),
                        status: '',
                        response: null,
                    }
                )
            );
    }

    convertToActivity(
        args: Observable<[RequestMetrics, FunctionStartResponse]>
    ): Observable<Activity> {
        return args.pipe(
            map(([metrics, startResponse]) => ({
                requestId: metrics.requestId,
                secondsDuration: getElapsedSecondsBetween(
                    metrics.startTime,
                    metrics.currTime
                ),
                status: metrics.status,
                statusUrl: startResponse.statusQueryGetUri,
                response: metrics.response,
            }))
        );
    }
}
