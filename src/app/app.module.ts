import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { LoadTesterComponent } from './components/load-tester/load-tester.component';
import { ProgressComponent } from './components/progress/progress.component';
import { DxChartModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';

@NgModule({
    declarations: [
        AppComponent,
        InputsComponent,
        LoadTesterComponent,
        ProgressComponent,
        ActivityDetailsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DxChartModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
