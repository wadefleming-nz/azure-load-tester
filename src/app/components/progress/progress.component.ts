import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';
import { of } from 'rxjs';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    dataSource$ = of([]);
    constructor(public requestManager: RequestManagerService) {}
}
