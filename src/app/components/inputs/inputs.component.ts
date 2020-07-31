import { Component, Output, EventEmitter } from '@angular/core';
import { TestInstance } from 'src/app/models/test-instance.model';
import { RequestManagerService } from 'src/app/services/request-manager.service';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.less'],
})
export class InputsComponent {
    numRequests = 1;
    endpointUrl =
        'https://titan-functions-consumption.azurewebsites.net/api/PrimeNumber_HttpStart?';

    @Output()
    startClicked = new EventEmitter<TestInstance>();

    constructor(public requestManager: RequestManagerService) {}

    onStartClicked() {
        this.requestManager.testInstanceSubject.next({
            // TODO use setter
            numRequests: this.numRequests,
            endpointUrl: this.endpointUrl,
        });
    }
}
