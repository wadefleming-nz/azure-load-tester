import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { Activity } from '../../models/activity.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    timeAxisMaxSeconds = 100;
    visibleRange = [0, this.timeAxisMaxSeconds];

    data$ = this.requestManager.testInstanceResults$;
    allCompleted$ = this.requestManager.allCompleted$;

    statusColors: Record<string, string> = {
        Pending: '#f25252',
        Running: '#f7ae39',
        Completed: '#06c723',
    };

    constructor(public requestManager: RequestManagerService) {}

    customizeLabel = (arg: any) => {
        const activity = arg.data as Activity;
        if (activity.status === 'Completed') {
            return {
                visible: true,
                customizeText: (_: any) => arg.value,
            };
        }
    };

    customizePoint = (arg: any) => {
        const activity = arg.data as Activity;
        return this.getColoredBarPointCustomization(
            this.statusColors[activity.status]
        );
    };

    getColoredBarPointCustomization(color: string) {
        return {
            color,
            hoverStyle: { color },
        };
    }
}
