import { Injectable } from '@angular/core';
import { RequestManagerService } from '../services/request-manager.service';
import { scan, map, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProgressService {
    initialTimeAxisMaxSeconds = 10;

    visibleRange$ = this.requestManager.maxDuration$.pipe(
        scan<number, number>(
            (timeAxisLimit, timeAxisMaxValue) =>
                timeAxisMaxValue > 0.75 * timeAxisLimit
                    ? timeAxisLimit * 2
                    : timeAxisLimit,
            this.initialTimeAxisMaxSeconds
        ),
        map((timeAxisLimit) => [0, timeAxisLimit]),
        share()
    );

    constructor(private requestManager: RequestManagerService) {}
}
