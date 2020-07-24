import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { InputsComponent } from './components/inputs/inputs.component';
import { LoadTesterComponent } from './components/load-tester/load-tester.component'

@NgModule({
    declarations: [AppComponent, InputsComponent, LoadTesterComponent],
    imports: [BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
