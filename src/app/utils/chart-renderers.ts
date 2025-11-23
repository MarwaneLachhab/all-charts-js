import { Chart } from 'chart.js';

// Helper function to detect if light mode is active
function isLightMode(): boolean {
  return document.body.classList.contains('light-theme');
}

// Get theme-aware colors
function getThemeColors() {
  const isLight = isLightMode();
  return {
    text: isLight ? '#1a1a2e' : '#e6ecff',
    grid: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    tooltip: {
      background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(12, 22, 48, 0.95)',
      text: isLight ? '#1a1a2e' : '#e6ecff',
      border: isLight ? 'rgba(102, 240, 255, 0.3)' : 'rgba(102, 240, 255, 0.5)'
    },
    datasets: {
      primary: isLight ? [
        'rgba(0, 123, 255, 0.8)',
        'rgba(102, 16, 242, 0.8)',
        'rgba(220, 53, 69, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(40, 167, 69, 0.8)',
        'rgba(23, 162, 184, 0.8)',
        'rgba(108, 117, 125, 0.8)',
        'rgba(232, 62, 140, 0.8)'
      ] : [
        'rgba(102, 240, 255, 0.8)',
        'rgba(255, 124, 214, 0.8)',
        'rgba(138, 255, 160, 0.8)',
        'rgba(255, 218, 128, 0.8)',
        'rgba(180, 144, 255, 0.8)',
        'rgba(255, 160, 122, 0.8)',
        'rgba(127, 255, 212, 0.8)',
        'rgba(255, 182, 193, 0.8)'
      ],
      border: isLight ? [
        'rgba(0, 123, 255, 1)',
        'rgba(102, 16, 242, 1)',
        'rgba(220, 53, 69, 1)',
        'rgba(255, 193, 7, 1)',
        'rgba(40, 167, 69, 1)',
        'rgba(23, 162, 184, 1)',
        'rgba(108, 117, 125, 1)',
        'rgba(232, 62, 140, 1)'
      ] : [
        'rgba(102, 240, 255, 1)',
        'rgba(255, 124, 214, 1)',
        'rgba(138, 255, 160, 1)',
        'rgba(255, 218, 128, 1)',
        'rgba(180, 144, 255, 1)',
        'rgba(255, 160, 122, 1)',
        'rgba(127, 255, 212, 1)',
        'rgba(255, 182, 193, 1)'
      ]
    }
  };
}

const pieTestData = [
  { label: 'Engineering', value: 32 },
  { label: 'Product', value: 18 },
  { label: 'Design', value: 12 },
  { label: 'Marketing', value: 11 },
  { label: 'Sales', value: 15 },
  { label: 'Support', value: 6 },
  { label: 'People Ops', value: 3 },
  { label: 'Finance', value: 3 }
];

// Custom plugin to draw leader lines and labels outside the pie slices
const pieLabelsLine = {
  id: 'pieLabelsLine',
  afterDraw: (chart: any) => {
    const { ctx, chartArea } = chart;
    if (!chartArea || !Array.isArray(chart.config.data.labels) || !chart.config.data.datasets?.length) {
      return;
    }

    const leftLabelCoordinates: number[] = [];
    const rightLabelCoordinates: number[] = [];
    const chartCenterPoint = {
      x: (chartArea.right - chartArea.left) / 2 + chartArea.left,
      y: (chartArea.bottom - chartArea.top) / 2 + chartArea.top
    };

    const labels = chart.config.data.labels.map((label: string | number) => String(label));
    const dataset = chart.config.data.datasets[0];
    const datasetValues = ((dataset.data as number[]) || []).map((value) => Number(value));

    if (!datasetValues.length) {
      return;
    }

    labels.forEach((label: string, i: number) => {
      const meta = chart.getDatasetMeta(0);
      const arc = meta.data[i];
      const colors = (dataset.backgroundColor as string[]) || [];
      const color = colors[i] || '#66f0ff';
      const centerPoint = arc.getCenterPoint();
      const value = datasetValues[i];

      const angle = Math.atan2(centerPoint.y - chartCenterPoint.y, centerPoint.x - chartCenterPoint.x);
      const point2X = chartCenterPoint.x + Math.cos(angle) * (arc.outerRadius + 12);
      let point2Y = chartCenterPoint.y + Math.sin(angle) * (arc.outerRadius + 35);

      const getSuitableY = (y: number, yArray: number[], direction: 'left' | 'right') => {
        let result = y;
        yArray.forEach((existingY) => {
          if (existingY - 14 < result && existingY + 14 > result) {
            result = direction === 'right' ? existingY + 14 : existingY - 14;
          }
        });
        return result;
      };

      const getOriginPoints = (source: { x: number; y: number }, center: { x: number; y: number }, length: number) => {
        const dx = (center.x - source.x) / length;
        const dy = (center.y - source.y) / length;
        return {
          x: center.x + length * dx,
          y: center.y + length * dy
        };
      };

      point2Y = point2X < chartCenterPoint.x
        ? getSuitableY(point2Y, leftLabelCoordinates, 'left')
        : getSuitableY(point2Y, rightLabelCoordinates, 'right');

      const edgePointX = point2X < chartCenterPoint.x
        ? chartCenterPoint.x - arc.outerRadius - 16
        : chartCenterPoint.x + arc.outerRadius + 16;

      if (point2X < chartCenterPoint.x) {
        leftLabelCoordinates.push(point2Y);
      } else {
        rightLabelCoordinates.push(point2Y);
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = color;

      const originPoint = getOriginPoints(chartCenterPoint, centerPoint, arc.outerRadius);
      ctx.beginPath();
      ctx.moveTo(originPoint.x, originPoint.y);
      ctx.lineTo(point2X, point2Y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(point2X, point2Y);
      ctx.lineTo(edgePointX, point2Y);
      ctx.stroke();

      const labelAlignStyle = edgePointX < chartCenterPoint.x ? 'right' : 'left';
      const labelX = edgePointX < chartCenterPoint.x ? edgePointX : edgePointX + 2;
      const labelY = point2Y + 7;
      const total = datasetValues.reduce((a: number, b: number) => a + b, 0);
      const percentage = ((value / total) * 100).toFixed(1);

      ctx.textAlign = labelAlignStyle;
      ctx.textBaseline = 'bottom';
      ctx.font = 'bold 13px Lato, sans-serif';
      const labelColor = typeof document !== 'undefined' && document.body.classList.contains('light-theme')
        ? '#0c1c32'
        : '#e8f1ff';
      ctx.fillStyle = labelColor;
      ctx.fillText(`${label}: ${percentage}%`, labelX, labelY);
    });
  }
};

function renderPieWithPlugin(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  const data = customData || {
    labels: pieTestData.map((item) => item.label),
    values: pieTestData.map((item) => item.value)
  };
  
  return new Chart(canvas, {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: colors.datasets.primary,
        borderColor: colors.datasets.border,
        borderWidth: 2
      }]
    },
    plugins: [pieLabelsLine],
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      layout: {
        padding: { left: 120, right: 120, top: 60, bottom: 60 }
      }
    }
  });
}

function renderBarChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  const data = customData || {
    labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance'],
    values: [430, 320, 210, 240, 380, 180, 260]
  };
  
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Values',
          data: data.values,
          backgroundColor: colors.datasets.primary[0],
          borderColor: colors.datasets.border[0],
          borderWidth: 2,
          borderRadius: 8
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: colors.text,
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        },
        x: {
          grid: { display: false },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderScatterChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Team members',
        data: [
          { x: 1, y: 68 },
          { x: 2, y: 75 },
          { x: 3, y: 82 },
          { x: 5, y: 95 },
          { x: 7, y: 110 },
          { x: 9, y: 135 },
          { x: 12, y: 150 }
        ],
        borderColor: colors.datasets.border[0],
        backgroundColor: colors.datasets.primary[0]
      }]
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Years in company', color: colors.text },
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        },
        y: {
          title: { display: true, text: 'Annual salary (k$)', color: colors.text },
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderRadarChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Base', 'Bonus', 'Equity', 'Benefits', 'Perks', 'Flex', 'Career'],
      datasets: [{
        label: 'Package coverage',
        data: [90, 70, 85, 80, 65, 75, 88],
        borderColor: colors.datasets.border[0],
        backgroundColor: colors.datasets.primary[0],
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        r: {
          grid: { color: colors.grid },
          pointLabels: { color: colors.text },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderPolarChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'polarArea',
    data: {
      labels: ['Wellness', 'Learning', 'Commute', 'Food', 'Remote'],
      datasets: [{
        label: 'Stipend mix',
        data: [12, 17, 11, 14, 10],
        backgroundColor: colors.datasets.primary.slice(0, 5),
        borderColor: colors.datasets.border.slice(0, 5),
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        },
        legend: {
          labels: { color: colors.text }
        }
      },
      scales: {
        r: {
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderLineChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Actual ($k)',
          data: [180, 190, 205, 210, 220, 230, 240],
          borderColor: colors.datasets.border[0],
          backgroundColor: colors.datasets.primary[0],
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Forecast ($k)',
          data: [175, 195, 200, 215, 225, 235, 245],
          borderColor: colors.datasets.border[1],
          borderDash: [6, 4],
          backgroundColor: colors.datasets.primary[1],
          borderWidth: 2,
          tension: 0.3
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: { color: colors.text }
        },
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        y: {
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        },
        x: {
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderBubbleChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'Pay bands',
        data: [
          { x: 70, y: 1, r: 10 },
          { x: 90, y: 2, r: 12 },
          { x: 120, y: 4, r: 16 },
          { x: 150, y: 6, r: 18 },
          { x: 200, y: 8, r: 20 }
        ],
        backgroundColor: colors.datasets.primary[1],
        borderColor: colors.datasets.border[1],
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Salary ($k)', color: colors.text },
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        },
        y: {
          title: { display: true, text: 'Years of experience', color: colors.text },
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderAreaChart(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Payroll burn ($k)',
        data: [210, 230, 245, 260, 255, 270, 290],
        fill: true,
        borderColor: colors.datasets.border[0],
        backgroundColor: colors.datasets.primary[0],
        borderWidth: 2,
        tension: 0.28
      }]
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      },
      scales: {
        y: { 
          grid: { color: colors.grid },
          ticks: { color: colors.text }
        },
        x: { 
          grid: { display: false },
          ticks: { color: colors.text }
        }
      }
    }
  });
}

function renderBenefitsPie(canvas: HTMLCanvasElement, customData?: any): Chart<any, any, any> {
  const colors = getThemeColors();
  return new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Health', 'Retirement', 'Wellness'],
      datasets: [{
        label: 'Benefits',
        data: [45, 35, 20],
        backgroundColor: colors.datasets.primary.slice(0, 3),
        borderColor: colors.datasets.border.slice(0, 3),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: colors.text }
        },
        tooltip: {
          backgroundColor: colors.tooltip.background,
          titleColor: colors.tooltip.text,
          bodyColor: colors.tooltip.text,
          borderColor: colors.tooltip.border,
          borderWidth: 1
        }
      }
    }
  });
}

export const chartRenderers: Record<string, (canvas: HTMLCanvasElement, customData?: any) => Chart<any, any, any>> = {
  piechartwithplugin: renderPieWithPlugin,
  barChart: renderBarChart,
  scatterChart: renderScatterChart,
  radarChart: renderRadarChart,
  polarChart: renderPolarChart,
  lineChart: renderLineChart,
  bubbleChart: renderBubbleChart,
  areaChart: renderAreaChart,
  normalepiechart: renderBenefitsPie
};
