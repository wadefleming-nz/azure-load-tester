import { Component } from '@angular/core';

@Component({
    selector: 'app-load-tester',
    templateUrl: './load-tester.component.html',
    styleUrls: ['./load-tester.component.less'],
})
export class LoadTesterComponent {
    onStartClicked(testInstance: { numRequests: number; endpointUrl: string }) {
        console.log(testInstance.numRequests);
        console.log(testInstance.endpointUrl);
    }
}
