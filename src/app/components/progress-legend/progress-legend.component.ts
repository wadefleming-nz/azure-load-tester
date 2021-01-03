import { Component } from '@angular/core';
import { statusColors } from 'src/app/constants/status-colors.constant';

@Component({
    selector: 'app-progress-legend',
    templateUrl: './progress-legend.component.html',
    styleUrls: ['./progress-legend.component.less'],
})
export class ProgressLegendComponent {
    statusColors = statusColors;
}
