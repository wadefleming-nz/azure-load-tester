import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { Activity } from '../../models/activity.model';
import { FunctionStatus } from '../../enums/function-status.enum';
import { statusColors } from 'src/app/constants/status-colors.constant';

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

    constructor(public requestManager: RequestManagerService) {}

    customizeLabel = (arg: any) => {
        const activity = arg.data as Activity;
        if (activity.status === FunctionStatus.Completed) {
            return {
                visible: true,
                customizeText: (_: any) => arg.value,
            };
        }
    };

    customizePoint = (arg: any) => {
        const activity = arg.data as Activity;
        return this.getColoredBarPointCustomization(
            statusColors[activity.status]
        );
    };

    getColoredBarPointCustomization(color: string) {
        return {
            color,
            hoverStyle: { color },
        };
    }

    seriesClicked(e: any) {
        const series = e.target;
        console.log('clicked');
    }
}
