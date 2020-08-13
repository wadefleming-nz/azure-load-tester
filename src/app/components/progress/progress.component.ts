import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { StatusViewerService } from 'src/app/services/status-viewer.service';
import { Activity } from '../../models/activity.model';
import { FunctionStatus } from '../../enums/function-status.enum';

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

    constructor(
        public requestManager: RequestManagerService,
        private statusViewer: StatusViewerService
    ) {
        this.data$.subscribe(console.log);
    }

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
            this.statusColors[activity.status]
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
        // TODO this.statusViewer.viewStatus(null);
    }
}
