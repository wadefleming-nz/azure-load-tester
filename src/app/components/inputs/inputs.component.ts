import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.less'],
})
export class InputsComponent {
    numRequests = 1;
    endpointUrl = '';

    @Output()
    startClicked = new EventEmitter<{
        numRequests: number;
        endpointUrl: string;
    }>();

    onStartClicked() {
        this.startClicked.emit({
            numRequests: this.numRequests,
            endpointUrl: this.endpointUrl,
        });
    }
}
