import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllChartsExampleComponent } from './all-charts-example/all-charts-example.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AllChartsExampleComponent,
    ChartDetailComponent,
    ChartCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
