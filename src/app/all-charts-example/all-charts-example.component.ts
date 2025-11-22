import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CHART_CARDS, ChartCard } from '../models/chart-data';

@Component({
  selector: 'app-all-charts-example',
  templateUrl: './all-charts-example.component.html',
  styleUrls: ['./all-charts-example.component.css']
})
export class AllChartsExampleComponent {
  chartCards: ChartCard[] = CHART_CARDS;
  isLightMode = false;
  searchTerm = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isLightMode = !this.isLightMode;
    document.body.classList.toggle('light-theme', this.isLightMode);
    document.documentElement.classList.toggle('light-theme', this.isLightMode);
    document.documentElement.classList.toggle('light-theme', this.isLightMode);
  }

  get filteredCards(): ChartCard[] {
    const query = this.searchTerm.trim().toLowerCase();
    if (!query) {
      return this.chartCards;
    }
    return this.chartCards.filter((card) =>
      `${card.title} ${card.about} ${card.tag} ${card.why}`.toLowerCase().includes(query)
    );
  }
}
