import { Chart } from 'chart.js';

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

function renderPieWithPlugin(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: pieTestData.map((item) => item.label),
      datasets: [{
        data: pieTestData.map((item) => item.value),
        backgroundColor: [
          '#66f0ff',
          '#7cf6c7',
          '#ff7cd6',
          '#ffd166',
          '#9a7bff',
          '#4ae3b5',
          '#ff9f7c',
          '#7bd3ff'
        ]
      }]
    },
    plugins: [pieLabelsLine],
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      layout: {
        padding: { left: 120, right: 120, top: 40, bottom: 40 }
      }
    }
  });
}

function renderBarChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance'],
      datasets: [
        {
          label: 'Base pay',
          data: [430, 320, 210, 240, 380, 180, 260],
          backgroundColor: 'rgba(102, 240, 255, 0.55)',
          borderRadius: 8
        },
        {
          label: 'Bonus',
          data: [120, 90, 70, 60, 180, 55, 80],
          backgroundColor: 'rgba(255, 124, 214, 0.55)',
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
            color: '#e8f1ff',
            font: { size: 12 }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#e8f1ff' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#e8f1ff' }
        }
      }
    }
  });
}

function renderScatterChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
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
        borderColor: '#66f0ff',
        backgroundColor: 'rgba(102, 240, 255, 0.25)'
      }]
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: 'Years in company' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#e8f1ff' }
        },
        y: {
          title: { display: true, text: 'Annual salary (k$)' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' },
          ticks: { color: '#e8f1ff' }
        }
      }
    }
  });
}

function renderRadarChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['Base', 'Bonus', 'Equity', 'Benefits', 'Perks', 'Flex', 'Career'],
      datasets: [{
        label: 'Package coverage',
        data: [90, 70, 85, 80, 65, 75, 88],
        borderColor: '#66f0ff',
        backgroundColor: 'rgba(102, 240, 255, 0.25)'
      }]
    },
    options: {
      scales: {
        r: {
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: { color: '#e8f1ff' }
        }
      }
    }
  });
}

function renderPolarChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'polarArea',
    data: {
      labels: ['Wellness', 'Learning', 'Commute', 'Food', 'Remote'],
      datasets: [{
        label: 'Stipend mix',
        data: [12, 17, 11, 14, 10],
        backgroundColor: [
          'rgba(102, 240, 255, 0.6)',
          'rgba(255, 124, 214, 0.6)',
          'rgba(123, 211, 255, 0.6)',
          'rgba(255, 209, 102, 0.6)',
          'rgba(154, 123, 255, 0.6)'
        ]
      }]
    }
  });
}

function renderLineChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Actual ($k)',
          data: [180, 190, 205, 210, 220, 230, 240],
          borderColor: '#66f0ff',
          backgroundColor: 'rgba(102, 240, 255, 0.15)',
          tension: 0.3
        },
        {
          label: 'Forecast ($k)',
          data: [175, 195, 200, 215, 225, 235, 245],
          borderColor: '#ff7cd6',
          borderDash: [6, 4],
          backgroundColor: 'rgba(255, 124, 214, 0.15)',
          tension: 0.3
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          labels: { color: '#e8f1ff' }
        }
      },
      scales: {
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#e8f1ff' }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.02)' },
          ticks: { color: '#e8f1ff' }
        }
      }
    }
  });
}

function renderBubbleChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
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
        backgroundColor: 'rgba(255, 124, 214, 0.35)',
        borderColor: 'rgba(255, 124, 214, 0.9)'
      }]
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: 'Salary ($k)' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' }
        },
        y: {
          title: { display: true, text: 'Years of experience' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' }
        }
      }
    }
  });
}

function renderAreaChart(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Payroll burn ($k)',
        data: [210, 230, 245, 260, 255, 270, 290],
        fill: true,
        borderColor: '#66f0ff',
        backgroundColor: 'rgba(102, 240, 255, 0.18)',
        tension: 0.28
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { grid: { color: 'rgba(255, 255, 255, 0.04)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function renderBenefitsPie(canvas: HTMLCanvasElement): void {
  new Chart(canvas, {
    type: 'pie',
    data: {
      labels: ['Health', 'Retirement', 'Wellness'],
      datasets: [{
        label: 'Benefits',
        data: [45, 35, 20],
        backgroundColor: [
          'rgba(102, 240, 255, 0.6)',
          'rgba(255, 124, 214, 0.6)',
          'rgba(255, 209, 102, 0.6)'
        ],
        borderColor: [
          'rgba(102, 240, 255, 1)',
          'rgba(255, 124, 214, 1)',
          'rgba(255, 209, 102, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

export const chartRenderers: Record<string, (canvas: HTMLCanvasElement) => void> = {
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
