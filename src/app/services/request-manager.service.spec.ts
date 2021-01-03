import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RequestManagerService } from './request-manager.service';

describe('RequestManagerService', () => {
    let service: RequestManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [RequestManagerService],
        });
        service = TestBed.inject(RequestManagerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
