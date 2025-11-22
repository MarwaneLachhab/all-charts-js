import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ExportChartService {
  
  /**
   * Export chart as PNG image
   * @param chart Chart instance
   * @param filename Desired filename (default: 'chart.png')
   */
  exportAsPNG(chart: Chart<any, any, any>, filename: string = 'chart.png'): void {
    try {
      const url = chart.toBase64Image();
      this.downloadFile(url, filename);
    } catch (error) {
      console.error('Error exporting chart as PNG:', error);
    }
  }

  /**
   * Export chart as JPEG image
   * @param chart Chart instance
   * @param filename Desired filename (default: 'chart.jpg')
   * @param quality Image quality (0-1, default: 0.92)
   */
  exportAsJPEG(chart: Chart<any, any, any>, filename: string = 'chart.jpg', quality: number = 0.92): void {
    try {
      const url = chart.toBase64Image('image/jpeg', quality);
      this.downloadFile(url, filename);
    } catch (error) {
      console.error('Error exporting chart as JPEG:', error);
    }
  }

  /**
   * Export chart data as JSON
   * @param chart Chart instance
   * @param filename Desired filename (default: 'chart-data.json')
   */
  exportAsJSON(chart: Chart<any, any, any>, filename: string = 'chart-data.json'): void {
    try {
      const data = JSON.stringify(chart.data, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      this.downloadFile(url, filename);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chart data as JSON:', error);
    }
  }

  /**
   * Export chart configuration as JSON
   * @param chart Chart instance
   * @param filename Desired filename (default: 'chart-config.json')
   */
  exportConfigAsJSON(chart: Chart<any, any, any>, filename: string = 'chart-config.json'): void {
    try {
      const config = {
        type: (chart.config as any).type,
        data: chart.data,
        options: chart.options
      };
      const data = JSON.stringify(config, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      this.downloadFile(url, filename);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chart config as JSON:', error);
    }
  }

  /**
   * Export chart data as CSV
   * @param chart Chart instance
   * @param filename Desired filename (default: 'chart-data.csv')
   */
  exportAsCSV(chart: Chart<any, any, any>, filename: string = 'chart-data.csv'): void {
    try {
      const csv = this.convertToCSV(chart.data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      this.downloadFile(url, filename);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting chart data as CSV:', error);
    }
  }

  /**
   * Print chart
   * @param chart Chart instance
   * @param title Optional title for the print
   */
  printChart(chart: Chart<any, any, any>, title?: string): void {
    try {
      const dataUrl = chart.toBase64Image();
      const printWindow = window.open('', '_blank');
      
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Chart</title></head><body>');
        if (title) {
          printWindow.document.write(`<h1 style="text-align: center;">${title}</h1>`);
        }
        printWindow.document.write(`<img src="${dataUrl}" style="max-width: 100%; height: auto;" />`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    } catch (error) {
      console.error('Error printing chart:', error);
    }
  }

  /**
   * Helper method to download a file
   */
  private downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Helper method to convert chart data to CSV format
   */
  private convertToCSV(data: any): string {
    const labels = data.labels || [];
    const datasets = data.datasets || [];
    
    // Create header row
    const headers = ['Label', ...datasets.map((ds: any) => ds.label || 'Data')];
    let csv = headers.join(',') + '\n';
    
    // Create data rows
    labels.forEach((label: any, index: number) => {
      const row = [label];
      datasets.forEach((dataset: any) => {
        const value = dataset.data[index];
        row.push(typeof value === 'object' ? JSON.stringify(value) : value);
      });
      csv += row.join(',') + '\n';
    });
    
    return csv;
  }
}
