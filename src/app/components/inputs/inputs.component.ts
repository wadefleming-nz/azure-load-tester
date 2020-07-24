import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.less'],
})
export class InputsComponent implements OnInit {
    numRequests = 1;
    endpointUrl = '';
    constructor() {}

    ngOnInit(): void {}

    onStartClicked() {
        console.log(this.numRequests);
        console.log(this.endpointUrl);
    }
}
