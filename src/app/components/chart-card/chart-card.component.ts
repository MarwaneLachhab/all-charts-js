import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartCard } from '../../models/chart-data';
import { chartRenderers } from '../../utils/chart-renderers';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.css']
})
export class ChartCardComponent implements AfterViewInit, OnDestroy {
  @Input() chart!: ChartCard;

  isCodeOpen = false;
  copyState = false;
  private chartInstance?: Chart;
  private static chartRegistered = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.ensureChartRegistered();
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }

  toggleCode(): void {
    this.isCodeOpen = !this.isCodeOpen;
  }

  copyCode(): void {
    if (!isPlatformBrowser(this.platformId) || !this.chart?.snippet) {
      return;
    }
    const onDone = () => {
      this.copyState = true;
      setTimeout(() => (this.copyState = false), 1500);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.chart.snippet).then(onDone).catch(() => this.fallbackCopy(this.chart.snippet, onDone));
    } else {
      this.fallbackCopy(this.chart.snippet, onDone);
    }
  }

  private fallbackCopy(text: string, onDone: () => void): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    onDone();
  }

  private ensureChartRegistered(): void {
    if (!ChartCardComponent.chartRegistered) {
      Chart.register(...registerables);
      ChartCardComponent.chartRegistered = true;
    }
  }

  private renderChart(): void {
    const canvas = document.getElementById(this.chart.id) as HTMLCanvasElement | null;
    const renderer = chartRenderers[this.chart.id];
    if (canvas && renderer) {
      this.chartInstance?.destroy();
      renderer(canvas);
    }
  }
}
