import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AllChartsExampleComponent } from './all-charts-example.component';
import { ExportChartService } from '../services/export-chart.service';

describe('AllChartsExampleComponent', () => {
  let component: AllChartsExampleComponent;
  let fixture: ComponentFixture<AllChartsExampleComponent>;
  let exportService: ExportChartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllChartsExampleComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [ExportChartService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllChartsExampleComponent);
    component = fixture.componentInstance;
    exportService = TestBed.inject(ExportChartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default chart cards', () => {
    expect(component.chartCards).toBeDefined();
    expect(component.chartCards.length).toBeGreaterThan(0);
  });

  it('should filter charts based on search term', () => {
    const initialCount = component.filteredCards.length;
    component.searchTerm = 'pie';
    expect(component.filteredCards.length).toBeLessThanOrEqual(initialCount);
  });

  it('should toggle theme mode', () => {
    const initialMode = component.isLightMode;
    component.toggleTheme();
    expect(component.isLightMode).toBe(!initialMode);
  });

  it('should toggle code panel visibility', () => {
    const chartId = 'test-chart';
    expect(component.isCodePanelVisible(chartId)).toBe(false);
    
    component.toggleCodePanel(chartId);
    expect(component.isCodePanelVisible(chartId)).toBe(true);
    
    component.toggleCodePanel(chartId);
    expect(component.isCodePanelVisible(chartId)).toBe(false);
  });

  it('should copy chart code', () => {
    spyOn(navigator.clipboard, 'writeText').and.returnValue(Promise.resolve());
    const chartId = component.chartCards[0].id;
    
    component.copyChartCode(chartId);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(component.isCopied(chartId)).toBe(true);
  });

  it('should export chart as PNG', () => {
    spyOn(exportService, 'exportAsPNG');
    const mockChart: any = { canvas: document.createElement('canvas') };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.exportChartAsPNG('test-chart');
    
    expect(exportService.exportAsPNG).toHaveBeenCalledWith(mockChart, 'test-chart-chart');
  });

  it('should export chart as JPEG', () => {
    spyOn(exportService, 'exportAsJPEG');
    const mockChart: any = { canvas: document.createElement('canvas') };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.exportChartAsJPEG('test-chart');
    
    expect(exportService.exportAsJPEG).toHaveBeenCalledWith(mockChart, 'test-chart-chart');
  });

  it('should export chart data as JSON', () => {
    spyOn(exportService, 'exportAsJSON');
    const mockChart: any = { data: { labels: [], datasets: [] } };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.exportChartData('test-chart');
    
    expect(exportService.exportAsJSON).toHaveBeenCalledWith(mockChart, 'test-chart-data');
  });

  it('should export chart data as CSV', () => {
    spyOn(exportService, 'exportAsCSV');
    const mockChart: any = { data: { labels: [], datasets: [] } };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.exportChartCSV('test-chart');
    
    expect(exportService.exportAsCSV).toHaveBeenCalledWith(mockChart, 'test-chart-data');
  });

  it('should print chart', () => {
    spyOn(exportService, 'printChart');
    const mockChart: any = { canvas: document.createElement('canvas') };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.printChart('test-chart');
    
    expect(exportService.printChart).toHaveBeenCalled();
  });

  it('should cleanup chart instances on destroy', () => {
    const mockChart: any = { 
      destroy: jasmine.createSpy('destroy')
    };
    component['chartInstances'].set('test-chart', mockChart);
    
    component.ngOnDestroy();
    
    expect(mockChart.destroy).toHaveBeenCalled();
  });
});
