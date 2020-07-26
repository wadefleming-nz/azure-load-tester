import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError, filter, map, share } from 'rxjs/operators';
import { TestInstance } from '../models/test-instance.model';

@Injectable({
    providedIn: 'root',
})
export class RequestManagerService {
    testInstanceSubject = new BehaviorSubject<TestInstance>(null);

    testInstanceResult$ = this.testInstanceSubject.pipe(
        filter((ti) => !!ti),
        switchMap((ti) =>
            this.http.get(ti.endpointUrl).pipe(
                catchError((err) => of(`Error: ${JSON.stringify(err)}`)),
                map((result) => JSON.stringify(result))
            )
        ),
        share()
    );

    constructor(private http: HttpClient) {}
}
