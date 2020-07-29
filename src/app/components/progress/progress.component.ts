import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { map, scan, filter } from 'rxjs/operators';
import { RequestMetrics } from '../../models/request-metrics.model';
import { ChartableRequestMetrics } from '../../models/chartable-request-metrics.model';
import { of } from 'rxjs';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    timeAxisMaxSeconds = 300;
    visibleRange = [0, this.timeAxisMaxSeconds];

    data$ = of([]);
    // this.requestManager.testInstanceResults$.pipe(
    //     filter((result) => !!result),
    //     scan(
    //         (acc, value) => ({ ...acc, currTime: new Date(), status: value }),
    //         {
    //             id: 1,
    //             startTime: new Date(),
    //             currTime: new Date(),
    //             status: 'None',
    //         }
    //     ),
    //     map((status) => [this.createChartableRequestMetrics(status)])
    // );

    constructor(public requestManager: RequestManagerService) {
        this.data$.subscribe(console.log);
    }

    private createChartableRequestMetrics(
        requestMetrics: RequestMetrics
    ): ChartableRequestMetrics {
        return {
            id: requestMetrics.id,
            elapsedSeconds: this.getElapsedSecondsBetween(
                requestMetrics.startTime,
                requestMetrics.currTime
            ),
        };
    }

    private getElapsedSecondsBetween(date1: Date, date2: Date) {
        const milliSecondsDiff = date2.getTime() - date1.getTime();
        return milliSecondsDiff / 1000;
    }
}
