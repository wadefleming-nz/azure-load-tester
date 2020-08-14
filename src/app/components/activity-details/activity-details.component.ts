import { Component, OnInit, Input } from '@angular/core';
import { FunctionStatusResponse } from 'src/app/models/function-status-response.model';
import { Activity } from 'src/app/models/activity.model';

@Component({
    selector: 'app-activity-details',
    templateUrl: './activity-details.component.html',
    styleUrls: ['./activity-details.component.less'],
})
export class ActivityDetailsComponent {
    private _activity: Activity;

    @Input() set activity(value: Activity) {
        this._activity = value;
        this.assignSolutionStatistics(value.response.output);
    }

    get activity() {
        return this._activity;
    }

    notLoadsCount: number;
    scenarioName: string;
    totalCost = 0;

    assignSolutionStatistics(solution: any) {
        this.scenarioName = solution.ScenarioName;
        this.notLoadsCount = solution.NotLoads.length;
        this.totalCost = solution.Routes.map((r) => r.Cost).reduce(
            (prev, cur) => prev + cur
        );
    }
}
