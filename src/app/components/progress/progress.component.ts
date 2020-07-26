import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    data$ = of([
        { id: 3, elapsedSeconds: 30 },
        { id: 2, elapsedSeconds: 178 },
        { id: 1, elapsedSeconds: 210 },
    ]);
    constructor(public requestManager: RequestManagerService) {}
}
