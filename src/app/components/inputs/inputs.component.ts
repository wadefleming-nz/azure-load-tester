import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.less'],
})
export class InputsComponent implements OnInit {
    endpointUrl = ''
    constructor() {}

    ngOnInit(): void {}

    onStartClicked() {
        console.log(this.endpointUrl)
    }
}
