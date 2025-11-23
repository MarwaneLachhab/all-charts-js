export interface ChartCard {
  id: string;
  title: string;
  tag: string;
  about: string;
  why: string;
  snippet: string;
  docPoints: string[];
  previewImage?: string;
}

export const CHART_CARDS: ChartCard[] = [
  {
    id: 'piechartwithplugin',
    title: 'Payroll distribution (pie + label lines)',
    tag: 'Share',
    about: 'Shows payroll share per team with labels outside the slices so every wedge stays readable.',
    why: 'Pick this when leaders want a quick view of which teams consume budget without hovering.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjgiIGZpbGw9IiM2NmYwZmYiLz48cGF0aCBkPSJNMzIgNEEyOCAyOCAwIDAgMCAzMiAzMloiIGZpbGw9IiNmZjdjZDYiLz48cGF0aCBkPSJNMzIgMzJMNTguNSAyMEEyOCAyOCAwIDAgMCA0NiA3LjVaIiBmaWxsPSIjOGFmZmEwIi8+PC9zdmc+',
    docPoints: [
      'Use for quick budget share by department with direct labels.',
      'Leader lines stay readable even with many slices.',
      'Great for exec reviews that prefer annotated visuals.'
    ],
    snippet: `const ctx = document.getElementById('piechartwithplugin') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'People Ops', 'Finance'],
    datasets: [{
      data: [32, 18, 12, 11, 15, 6, 3, 3],
      backgroundColor: ['#66f0ff', '#7cf6c7', '#ff7cd6', '#ffd166', '#9a7bff', '#4ae3b5', '#ff9f7c', '#7bd3ff']
    }]
  },
  plugins: [pieLabelsLine],
  options: { maintainAspectRatio: false, plugins: { legend: { display: false }}, layout: { padding: { left: 120, right: 120, top: 40, bottom: 40 } } }
});`
  },
  {
    id: 'barChart',
    title: 'Base vs bonus by team',
    tag: 'Compare',
    about: 'Grouped bars compare base pay and bonus outlay for every team in one glance.',
    why: 'Ideal for comp committees to see mix differences and rebalance incentives.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3QgeD0iOCIgeT0iMzAiIHdpZHRoPSI4IiBoZWlnaHQ9IjI2IiBmaWxsPSIjNjZmMGZmIiByeD0iMiIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjgiIGhlaWdodD0iMzYiIGZpbGw9IiNmZjdjZDYiIHJ4PSIyIi8+PHJlY3QgeD0iMzIiIHk9IjEwIiB3aWR0aD0iOCIgaGVpZ2h0PSI0NiIgZmlsbD0iIzhhZmZhMCIgcng9IjIiLz48cmVjdCB4PSI0NCIgeT0iMjUiIHdpZHRoPSI4IiBoZWlnaHQ9IjMxIiBmaWxsPSIjZmZkYTgwIiByeD0iMiIvPjxsaW5lIHgxPSI0IiB5MT0iNTYiIHgyPSI2MCIgeTI9IjU2IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
    docPoints: [
      'Great for comparing compensation mix across multiple teams.',
      'Place legend at bottom for quick scanning.',
      'Keep bar radius soft to match the 3D look.'
    ],
    snippet: `const ctx = document.getElementById('barChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Support', 'Finance'],
    datasets: [
      { label: 'Base pay', data: [430, 320, 210, 240, 380, 180, 260], backgroundColor: 'rgba(102, 240, 255, 0.55)', borderRadius: 8 },
      { label: 'Bonus', data: [120, 90, 70, 60, 180, 55, 80], backgroundColor: 'rgba(255, 124, 214, 0.55)', borderRadius: 8 }
    ]
  },
  options: { responsive: true, plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
});`
  },
  {
    id: 'scatterChart',
    title: 'Salary vs tenure scatter',
    tag: 'Correlation',
    about: 'Each dot is a person; see how salary scales with tenure and spot outliers.',
    why: 'Use it to find people outside their band so you can adjust before review time.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGNpcmNsZSBjeD0iMTIiIGN5PSI0OCIgcj0iMyIgZmlsbD0iIzY2ZjBmZiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNDAiIHI9IjMiIGZpbGw9IiNmZjdjZDYiLz48Y2lyY2xlIGN4PSIyOCIgY3k9IjM1IiByPSIzIiBmaWxsPSIjOGFmZmEwIi8+PGNpcmNsZSBjeD0iMzYiIGN5PSIyNSIgcj0iMyIgZmlsbD0iI2ZmZGE4MCIvPjxjaXJjbGUgY3g9IjQ0IiBjeT0iMjAiIHI9IjMiIGZpbGw9IiNiNDkwZmYiLz48Y2lyY2xlIGN4PSI1MiIgY3k9IjE1IiByPSIzIiBmaWxsPSIjZmY5ZjdjIi8+PGxpbmUgeDE9IjQiIHkxPSI1NiIgeDI9IjYwIiB5Mj0iNTYiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGxpbmUgeDE9IjgiIHkxPSI2MCIgeDI9IjgiIHkyPSI0IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
    docPoints: [
      'Plot salaries against tenure to flag outliers.',
      'Add titles to axes for quick context.',
      'Use translucent fills so overlaps remain visible.'
    ],
    snippet: `const ctx = document.getElementById('scatterChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Team members',
      data: [{ x: 1, y: 68 }, { x: 2, y: 75 }, { x: 3, y: 82 }, { x: 5, y: 95 }, { x: 7, y: 110 }, { x: 9, y: 135 }, { x: 12, y: 150 }],
      borderColor: '#66f0ff',
      backgroundColor: 'rgba(102, 240, 255, 0.25)'
    }]
  },
  options: { scales: { x: { title: { display: true, text: 'Years in company' } }, y: { title: { display: true, text: 'Annual salary (k$)' } } } }
});`
  },
  {
    id: 'radarChart',
    title: 'Comp balance radar',
    tag: 'Balance',
    about: 'Radar plot to see how a comp package balances base, bonus, equity, perks, and flexibility.',
    why: 'Great for comparing different offers or checking if a package is over-weighted.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHBvbHlnb24gcG9pbnRzPSIzMiw4IDU0LDIwIDUwLDQ0IDMyLDU2IDE0LDQ0IDEwLDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSIvPjxwb2x5Z29uIHBvaW50cz0iMzIsMTYgNDYsMjQgNDQsMzggMzIsNDYgMjAsMzggMTgsMjQiIGZpbGw9InJnYmEoMTAyLCAyNDAsIDI1NSwgMC40KSIgc3Ryb2tlPSIjNjZmMGZmIiBzdHJva2Utd2lkdGg9IjIiLz48bGluZSB4MT0iMzIiIHkxPSIzMiIgeDI9IjMyIiB5Mj0iOCIgc3Ryb2tlPSIjODg4ODg4IiBzdHJva2Utd2lkdGg9IjEiLz48bGluZSB4MT0iMzIiIHkxPSIzMiIgeDI9IjU0IiB5Mj0iMjAiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLXdpZHRoPSIxIi8+PGxpbmUgeDE9IjMyIiB5MT0iMzIiIHgyPSI1MCIgeTI9IjQ0IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==',
    docPoints: [
      'Use for multi-dimension comp balance comparisons.',
      'Keep grid light so the fill stands out.',
      'Nice for showing package balance in offer reviews.'
    ],
    snippet: `const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Base', 'Bonus', 'Equity', 'Benefits', 'Perks', 'Flex', 'Career'],
    datasets: [{
      label: 'Package coverage',
      data: [90, 70, 85, 80, 65, 75, 88],
      borderColor: '#66f0ff',
      backgroundColor: 'rgba(102, 240, 255, 0.25)'
    }]
  }
});`
  },
  {
    id: 'polarChart',
    title: 'Stipend mix polar',
    tag: 'Mix',
    about: 'Polar area quickly shows which stipends (learning, wellness, commute) win budget.',
    why: 'Use for a fast pulse on perk usage without overwhelming detail.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzg4ODg4OCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTMyIDRBMjggMjggMCAwIDEgNjAgMzJMNTAgMzJBMTggMTggMCAwIDAgMzIgMTRaIiBmaWxsPSIjNjZmMGZmIi8+PHBhdGggZD0iTTYwIDMyQTI4IDI4IDAgMCAxIDMyIDYwTDMyIDUwQTE4IDE4IDAgMCAwIDUwIDMyWiIgZmlsbD0iI2ZmN2NkNiIvPjxwYXRoIGQ9Ik0zMiA2MEEyOCAyOCAwIDAgMSA0IDMyTDE0IDMyQTE4IDE4IDAgMCAwIDMyIDUwWiIgZmlsbD0iIzhhZmZhMCIvPjxwYXRoIGQ9Ik00IDMyQTI4IDI4IDAgMCAxIDMyIDRMMzIgMTRBMTggMTggMCAwIDAgMTQgMzJaIiBmaWxsPSIjZmZkYTgwIi8+PC9zdmc+',
    docPoints: [
      'Great when you want a pie alternative with radial emphasis.',
      'Good for perk or stipend mix snapshots.',
      'Keep labels short to avoid crowding.'
    ],
    snippet: `const ctx = document.getElementById('polarChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ['Wellness', 'Learning', 'Commute', 'Food', 'Remote'],
    datasets: [{
      data: [12, 17, 11, 14, 10],
      backgroundColor: ['rgba(102, 240, 255, 0.6)', 'rgba(255, 124, 214, 0.6)', 'rgba(123, 211, 255, 0.6)', 'rgba(255, 209, 102, 0.6)', 'rgba(154, 123, 255, 0.6)']
    }]
  }
});`
  },
  {
    id: 'lineChart',
    title: 'Payroll actual vs forecast',
    tag: 'Forecast',
    about: 'Two animated lines show what you planned vs. what payroll actually spent.',
    why: 'Perfect for budget reviews where you need to highlight slippage or savings.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHBvbHlsaW5lIHBvaW50cz0iOCw0OCAyMCwzNSAzMiwyOCA0NCwyMCA1NiwxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjZmMGZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwb2x5bGluZSBwb2ludHM9IjgsNTAgMjAsNDAgMzIsMzAgNDQsMzUgNTYsMjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmN2NkNiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48bGluZSB4MT0iNCIgeTE9IjU2IiB4Mj0iNjAiIHkyPSI1NiIgc3Ryb2tlPSIjODg4ODg4IiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
    docPoints: [
      'Plot actual vs forecast to flag deltas.',
      'Use dashed line for forecast for clarity.',
      'Smooth tension makes the lines feel premium.'
    ],
    snippet: `const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      { label: 'Actual ($k)', data: [180, 190, 205, 210, 220, 230, 240], borderColor: '#66f0ff', tension: 0.3 },
      { label: 'Forecast ($k)', data: [175, 195, 200, 215, 225, 235, 245], borderColor: '#ff7cd6', borderDash: [6, 4], tension: 0.3 }
    ]
  }
});`
  },
  {
    id: 'bubbleChart',
    title: 'Pay bands bubble map',
    tag: 'Bands',
    about: 'Bubble sizes represent headcount inside each pay band, plotted by salary and tenure.',
    why: 'Use this to see which bands are crowded and where hiring might be thin.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGNpcmNsZSBjeD0iMTUiIGN5PSI0NSIgcj0iNiIgZmlsbD0icmdiYSgxMDIsIDI0MCwgMjU1LCAwLjYpIiBzdHJva2U9IiM2NmYwZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjI4IiBjeT0iMzUiIHI9IjgiIGZpbGw9InJnYmEoMjU1LCAxMjQsIDIxNCwgMC42KSIgc3Ryb2tlPSIjZmY3Y2Q2IiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSI0NSIgY3k9IjI1IiByPSI1IiBmaWxsPSJyZ2JhKDEzOCwgMjU1LCAxNjAsIDAuNikiIHN0cm9rZT0iIzhhZmZhMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMzgiIGN5PSI0NSIgcj0iNCIgZmlsbD0icmdiYSgyNTUsIDIxOCwgMTI4LCAwLjYpIiBzdHJva2U9IiNmZmRhODAiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI0IiB5MT0iNTYiIHgyPSI2MCIgeTI9IjU2IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==',
    docPoints: [
      'Bubble radius tracks headcount per band.',
      'Plot salary vs tenure to show distribution.',
      'Good for hiring and leveling plans.'
    ],
    snippet: `const ctx = document.getElementById('bubbleChart') as HTMLCanvasElement;
new Chart(ctx, {
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
  }
});`
  },
  {
    id: 'areaChart',
    title: 'Payroll runway area',
    tag: 'Trend',
    about: 'A filled line keeps focus on overall payroll burn with a soft glow under the curve.',
    why: 'Best for storytelling when you want both direction and volume without extra clutter.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHBhdGggZD0iTTggNTZMOCA0MEwyMCAzMEwzMiAyNUw0NCAxOEw1NiAxMkw1NiA1NloiIGZpbGw9InJnYmEoMTAyLCAyNDAsIDI1NSwgMC4zKSIvPjxwb2x5bGluZSBwb2ludHM9IjgsNDAgMjAsMzAgMzIsMjUgNDQsMTggNTYsMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzY2ZjBmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48bGluZSB4MT0iNCIgeTE9IjU2IiB4Mj0iNjAiIHkyPSI1NiIgc3Ryb2tlPSIjODg4ODg4IiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
    docPoints: [
      'Use filled area to emphasize volume over time.',
      'Hide legend if only one dataset.',
      'Pairs well with budget narratives.'
    ],
    snippet: `const ctx = document.getElementById('areaChart') as HTMLCanvasElement;
new Chart(ctx, {
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
  }
});`
  },
  {
    id: 'normalepiechart',
    title: 'Benefits split pie',
    tag: 'Benefits',
    about: 'Simple pie for benefit spend: health, retirement, and wellness perks.',
    why: 'Use when you want a compact view of how much total comp goes to benefits.',
    previewImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjgiIGZpbGw9IiNiNDkwZmYiLz48cGF0aCBkPSJNMzIgNEEyOCAyOCAwIDAgMSA2MCAzMkwzMiAzMloiIGZpbGw9IiNmZmRhODAiLz48cGF0aCBkPSJNMzIgMzJMNjAgMzJBMjggMjggMCAwIDEgNDQgNTVaIiBmaWxsPSIjZmY5ZjdjIi8+PC9zdmc+',
    docPoints: [
      'Keep slices limited to avoid crowding.',
      'Great for quick benefits cost splits.',
      'Use strong border colors for separation.'
    ],
    snippet: `const ctx = document.getElementById('normalepiechart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Health', 'Retirement', 'Wellness'],
    datasets: [{
      label: 'Benefits',
      data: [45, 35, 20],
      backgroundColor: ['rgba(102, 240, 255, 0.6)', 'rgba(255, 124, 214, 0.6)', 'rgba(255, 209, 102, 0.6)'],
      borderColor: ['rgba(102, 240, 255, 1)', 'rgba(255, 124, 214, 1)', 'rgba(255, 209, 102, 1)'],
      borderWidth: 1
    }]
  },
  options: { responsive: true, maintainAspectRatio: false }
});`
  }
];
