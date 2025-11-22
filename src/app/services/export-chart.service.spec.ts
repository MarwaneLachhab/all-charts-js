import { TestBed } from '@angular/core/testing';
import { ExportChartService } from './export-chart.service';

describe('ExportChartService', () => {
  let service: ExportChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
