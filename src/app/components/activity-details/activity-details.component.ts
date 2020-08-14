import { Component, OnInit, Input } from '@angular/core';
import { FunctionStatusResponse } from 'src/app/models/function-status-response.model';
import { Activity } from 'src/app/models/activity.model';

@Component({
    selector: 'app-activity-details',
    templateUrl: './activity-details.component.html',
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
        solution.Routes.reduce((prev, cur) => {
            const prevCost = prev && prev.Cost ? prev.Cost : 0;
            const curCost = cur && cur.Cost ? cur.Cost : 0;
            this.totalCost = this.totalCost + prevCost + curCost;
        });
    }
}
