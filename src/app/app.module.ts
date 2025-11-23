import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllChartsExampleComponent } from './all-charts-example/all-charts-example.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { ExportChartService } from './services/export-chart.service';

@NgModule({
  declarations: [
    AppComponent,
    AllChartsExampleComponent,
    ChartDetailComponent,
    ChartCardComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ExportChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
