import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChartsExampleComponent } from './all-charts-example/all-charts-example.component';
import { ChartDetailComponent } from './chart-detail/chart-detail.component';

const routes: Routes = [
  { path: '', component: AllChartsExampleComponent },
  { path: 'charts/:id', component: ChartDetailComponent },
  { path: 'docs/:id', component: ChartDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
