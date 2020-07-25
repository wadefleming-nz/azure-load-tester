import { Component, Output, EventEmitter } from '@angular/core';
import { TestInstance } from 'src/app/models/test-instance.model';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.less'],
})
export class InputsComponent {
    numRequests = 1;
    endpointUrl = '';

    @Output()
    startClicked = new EventEmitter<TestInstance>();

    onStartClicked() {
        this.startClicked.emit({
            numRequests: this.numRequests,
            endpointUrl: this.endpointUrl,
        });
    }
}
