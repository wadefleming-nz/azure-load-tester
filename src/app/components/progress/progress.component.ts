import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { Activity } from '../../models/activity.model';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    timeAxisMaxSeconds = 100;
    visibleRange = [0, this.timeAxisMaxSeconds];
    completeColor = '#06c723';

    data$ = this.requestManager.testInstanceResults$;

    constructor(public requestManager: RequestManagerService) {}

    customizeLabel = (arg: any) => {
        const activity = arg.data as Activity;
        if (activity.status == 'Completed') {
            return {
                visible: true,
                customizeText: (_: any) => arg.value,
            };
        }
    };

    customizePoint = (arg: any) => {
        const activity = arg.data as Activity;
        if (activity.status == 'Completed') {
            return {
                color: this.completeColor,
                hoverStyle: { color: this.completeColor },
            };
        }
    };
}
