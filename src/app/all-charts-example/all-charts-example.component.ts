import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CHART_CARDS, ChartCard } from '../models/chart-data';
import { chartRenderers } from '../utils/chart-renderers';
import { ExportChartService } from '../services/export-chart.service';

@Component({
  selector: 'app-all-charts-example',
  templateUrl: './all-charts-example.component.html',
  styleUrls: ['./all-charts-example.component.css']
})
export class AllChartsExampleComponent implements AfterViewInit, OnDestroy {
  chartCards: ChartCard[] = CHART_CARDS;
  isLightMode = false;
  private _searchTerm = '';
  visibleCodePanels: Set<string> = new Set();
  copiedStates: Map<string, boolean> = new Map();
  private chartInstances: Map<string, Chart<any, any, any>> = new Map();
  private static chartRegistered = false;
  private renderTimeout?: any;
  showSearchDropdown = false;
  searchFocused = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private exportService: ExportChartService,
    private router: Router
  ) {}

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    if (isPlatformBrowser(this.platformId)) {
      // Debounce chart re-rendering
      if (this.renderTimeout) {
        clearTimeout(this.renderTimeout);
      }
      this.renderTimeout = setTimeout(() => {
        this.renderAllCharts();
      }, 300);
    }
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isLightMode = !this.isLightMode;
    document.body.classList.toggle('light-theme', this.isLightMode);
    document.documentElement.classList.toggle('light-theme', this.isLightMode);
    document.documentElement.classList.toggle('light-theme', this.isLightMode);
    
    // Re-render charts with new theme colors
    this.renderAllCharts();
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

  toggleCodePanel(chartId: string): void {
    if (this.visibleCodePanels.has(chartId)) {
      this.visibleCodePanels.delete(chartId);
    } else {
      this.visibleCodePanels.add(chartId);
    }
  }

  isCodePanelVisible(chartId: string): boolean {
    return this.visibleCodePanels.has(chartId);
  }

  scrollToFirstMatch(): void {
    if (this.searchTerm.trim()) {
      this.closeSearchDropdown();
      // Navigate to search results page
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm.trim() } });
    }
  }

  onSearchFocus(): void {
    this.searchFocused = true;
    if (this.searchTerm.trim()) {
      this.showSearchDropdown = true;
    }
  }

  onSearchBlur(): void {
    // Delay to allow click on dropdown items
    setTimeout(() => {
      this.searchFocused = false;
      this.showSearchDropdown = false;
    }, 200);
  }

  onSearchInput(): void {
    this.showSearchDropdown = this.searchTerm.trim().length > 0;
  }

  selectSearchResult(chart: ChartCard): void {
    this.closeSearchDropdown();
    this.searchTerm = '';
    // Navigate to chart detail page
    this.router.navigate(['/charts', chart.id]);
  }

  viewChartDetail(chartId: string): void {
    this.router.navigate(['/charts', chartId]);
  }

  closeSearchDropdown(): void {
    this.showSearchDropdown = false;
  }



  highlightCode(code: string): string {
    // Simple syntax highlighting for TypeScript/JavaScript code
    let highlighted = code
      // Comments
      .replace(/\/\/(.*?)$/gm, '<span class="comment">//$1</span>')
      .replace(/\/\*([\s\S]*?)\*\//g, '<span class="comment">/*$1*/</span>')
      // Strings
      .replace(/(['"`])((?:\\.|[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
      // Keywords
      .replace(/\b(const|let|var|function|return|if|else|for|while|new|import|from|export|default|class|extends|constructor|async|await|try|catch|throw|typeof|instanceof)\b/g, '<span class="keyword">$1</span>')
      // Function calls
      .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
      // Numbers
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
      // Properties
      .replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="property">$1</span>');
    
    return highlighted;
  }

  exportChartAsPNG(chartId: string): void {
    const chart = this.chartInstances.get(chartId);
    if (chart) {
      this.exportService.exportAsPNG(chart, `${chartId}-chart`);
    }
  }

  exportChartAsJPEG(chartId: string): void {
    const chart = this.chartInstances.get(chartId);
    if (chart) {
      this.exportService.exportAsJPEG(chart, `${chartId}-chart`);
    }
  }

  exportChartData(chartId: string): void {
    const chart = this.chartInstances.get(chartId);
    if (chart) {
      this.exportService.exportAsJSON(chart, `${chartId}-data`);
    }
  }

  exportChartCSV(chartId: string): void {
    const chart = this.chartInstances.get(chartId);
    if (chart) {
      this.exportService.exportAsCSV(chart, `${chartId}-data`);
    }
  }

  printChart(chartId: string): void {
    const chart = this.chartInstances.get(chartId);
    if (chart) {
      this.exportService.printChart(chart, `${this.getChartTitle(chartId)} Chart`);
    }
  }

  private getChartTitle(chartId: string): string {
    const card = this.chartCards.find(c => c.id === chartId);
    return card?.title || chartId;
  }

  copyChartCode(chartId: string): void {
    const chart = this.chartCards.find(c => c.id === chartId);
    if (chart && isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(chart.snippet).then(() => {
        this.copiedStates.set(chartId, true);
        setTimeout(() => {
          this.copiedStates.delete(chartId);
        }, 2000);
      });
    }
  }

  isCopied(chartId: string): boolean {
    return this.copiedStates.get(chartId) || false;
  }

  scrollToChart(index: number): void {
    const showcases = document.querySelectorAll('.chart-showcase');
    if (showcases[index]) {
      showcases[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.ensureChartRegistered();
    // Use setTimeout to ensure DOM elements are ready
    setTimeout(() => {
      this.renderAllCharts();
    }, 100);
  }



  ngOnDestroy(): void {
    this.chartInstances.forEach(chart => chart.destroy());
    this.chartInstances.clear();
  }



  private ensureChartRegistered(): void {
    if (!AllChartsExampleComponent.chartRegistered) {
      Chart.register(...registerables);
      AllChartsExampleComponent.chartRegistered = true;
    }
  }

  private renderAllCharts(): void {
    // Clear existing charts
    this.chartInstances.forEach(chart => chart.destroy());
    this.chartInstances.clear();
    
    // Wait a bit for DOM to update
    setTimeout(() => {
      this.filteredCards.forEach(card => {
        this.renderChart(card);
      });
    }, 50);
  }

  private renderChart(card: ChartCard): void {
    const canvasElement = document.getElementById(card.id) as HTMLCanvasElement;
    if (!canvasElement) {
      console.warn(`Canvas element not found for chart: ${card.id}`);
      return;
    }

    // Destroy existing chart if it exists
    const existingChart = this.chartInstances.get(card.id);
    if (existingChart) {
      existingChart.destroy();
    }

    const renderer = chartRenderers[card.id];
    if (renderer) {
      try {
        const newChart = renderer(canvasElement);
        if (newChart) {
          this.chartInstances.set(card.id, newChart);
        }
      } catch (error) {
        console.error(`Error rendering chart ${card.id}:`, error);
      }
    } else {
      console.warn(`No renderer found for chart: ${card.id}`);
    }
  }
}
