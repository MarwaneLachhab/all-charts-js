import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CHART_CARDS, ChartCard } from '../models/chart-data';
import { chartRenderers } from '../utils/chart-renderers';

@Component({
  selector: 'app-chart-detail',
  templateUrl: './chart-detail.component.html',
  styleUrls: ['./chart-detail.component.css']
})
export class ChartDetailComponent implements OnInit, AfterViewInit {
  card?: ChartCard;
  isLightMode = false;
  copyState = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.card = CHART_CARDS.find((c) => c.id === id);
    if (!this.card) {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.card) {
      return;
    }
    Chart.register(...registerables);
    this.isLightMode = document.body.classList.contains('light-theme');
    this.renderChart();
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isLightMode = !this.isLightMode;
    document.body.classList.toggle('light-theme', this.isLightMode);
    document.documentElement.classList.toggle('light-theme', this.isLightMode);
  }

  copyCode(): void {
    if (!isPlatformBrowser(this.platformId) || !this.card?.snippet) {
      return;
    }

    const onDone = () => {
      this.copyState = true;
      setTimeout(() => (this.copyState = false), 1500);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.card.snippet).then(onDone).catch(() => this.fallbackCopy(this.card?.snippet || '', onDone));
    } else {
      this.fallbackCopy(this.card.snippet, onDone);
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

  private renderChart(): void {
    if (!this.card) {
      return;
    }
    const canvas = document.getElementById('detailChart') as HTMLCanvasElement | null;
    const renderer = chartRenderers[this.card.id];
    if (canvas && renderer) {
      renderer(canvas);
    }
  }
}
