import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { RequestManagerService } from './request-manager.service';

@Injectable({
    providedIn: 'root',
})
export class StatusViewerService {
    private viewStatusSubject = new BehaviorSubject<number>(null);
    private viewStatus$ = this.viewStatusSubject.asObservable();

    private statusUrl$ = this.viewStatus$.pipe(
        withLatestFrom(this.requestManager.testInstanceResults$),
        map(
            ([id, activities]) =>
                activities.find((a) => a.requestId === id).statusUrl
        )
    );

    constructor(public requestManager: RequestManagerService) {
        this.statusUrl$.subscribe((url) => window.open(url, '_blank'));
    }

    viewStatus(id: number) {
        this.viewStatusSubject.next(id);
    }
}
