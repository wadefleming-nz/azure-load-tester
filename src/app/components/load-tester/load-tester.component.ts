import { Component } from '@angular/core';
import { TestInstance } from 'src/app/models/test-instance.model';

@Component({
    selector: 'app-load-tester',
    templateUrl: './load-tester.component.html',
    styleUrls: ['./load-tester.component.less'],
})
export class LoadTesterComponent {
    onStartClicked(testInstance: TestInstance) {
        console.log(testInstance.numRequests);
        console.log(testInstance.endpointUrl);
    }
}
