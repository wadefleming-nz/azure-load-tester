import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    timeAxisMaxSeconds = 100;
    visibleRange = [0, this.timeAxisMaxSeconds];

    data$ = this.requestManager.testInstanceResults$;

    constructor(public requestManager: RequestManagerService) {}

    customizeLabel = (arg: any) => {
        return {
            visible: true,
            customizeText: (_: any) => arg.value,
        };
    };
}
