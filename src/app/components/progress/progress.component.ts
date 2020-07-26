import { Component } from '@angular/core';
import { RequestManagerService } from 'src/app/services/request-manager.service';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.less'],
})
export class ProgressComponent {
    constructor(public requestManager: RequestManagerService) {}
}
