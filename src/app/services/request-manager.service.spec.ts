import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { RequestManagerService } from './request-manager.service';

describe('RequestManagerService', () => {
    let service: RequestManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
        service = TestBed.inject(RequestManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('initiates function correct number of times', () => {
        const httpTestingController = TestBed.inject(HttpTestingController);

        service.testInstanceResults$.subscribe();
        service.allCompleted$.subscribe();

        service.testInstanceSubject.next({
            numRequests: 1,
            endpointUrl: 'http://mock-function-start-endpoint',
            payload: null,
        });

        httpTestingController.expectOne('http://mock-function-start-endpoint');
        httpTestingController.verify();
    });
});
