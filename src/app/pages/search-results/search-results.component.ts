import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CHART_CARDS, ChartCard } from '../../models/chart-data';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery = '';
  results: ChartCard[] = [];
  isLightMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });
    this.isLightMode = document.body.classList.contains('light-theme');
  }

  performSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      this.results = [];
      return;
    }
    this.results = CHART_CARDS.filter((card) =>
      `${card.title} ${card.about} ${card.tag} ${card.why}`.toLowerCase().includes(query)
    );
  }

  goToChart(chartId: string): void {
    this.router.navigate(['/charts', chartId]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
