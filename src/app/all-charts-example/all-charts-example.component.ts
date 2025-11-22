import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-all-charts-example',
  templateUrl: './all-charts-example.component.html',
  styleUrl: './all-charts-example.component.css'
})
export class AllChartsExampleComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    // Variable pour stocker l'instance du graphique
    chart: any;

  ngOnInit(): void {
    Chart.register(...registerables);
    // Vérification si l'application s'exécute dans un navigateur
    if (isPlatformBrowser(this.platformId)) {

      // Création des graphiques une fois que l'application s'exécute dans un navigateur
      this.createPieWithPluginChart();
      this.createBarChart();
      this.createScatterChart();
      this.createRadarChart();
      this.createPolarChart();
      this.createLineChart();
      this.createBubbleChart();
      this.createAreaChart();
      this.createNormalePieChart();
    }
  }

  // Données pour le graphique en secteurs (pie chart)
  testData = [
    { label: 'Maladies infectieuses', value: 5 },
    { label: 'Maladies cardiovasculaires', value: 4.22 },
    { label: 'Maladies digestives', value: 7 },
    { label: 'Maladies respiratoires', value: 33.79 },
    { label: 'Blessures/fractures/traumatismes', value: 7.10 },
    { label: 'Maladies musculaires/osseuses', value: 1.09 },
    { label: 'Maladies dermatologiques', value: 8.71 },
    { label: 'Maladie génito urinaire/accouchement', value: 11.01 },
    { label: 'Maladie génito urinaire/accouchement', value: 10.19 },
    { label: 'Maladie génito urinaire/accouchement', value: 9.18 },
    { label: 'Autres', value: 17.71 },
    { label: 'Maladie génito urinaire/accouchement', value: 5 },
    { label: 'Maladie génito urinaire/accouchement', value: 6 },
    { label: 'Maladie génito urinaire/accouchement', value: 9 },
  ];
  // Plugin pour afficher les étiquettes en dehors des tranches de pie chart
  pieLabelsLine = {
    // Identifiant unique pour le plugin
    id: "pieLabelsLine",
    // Fonction à exécuter après le dessin du graphique
    afterDraw(chart: any ) {
      // Extraction des propriétés nécessaires de l'objet de graphique
      const {
        ctx,
        chartArea: { width, height },
      } = chart;

      // Tableaux pour stocker les coordonnées Y des étiquettes gauche et droite
      const leftLabelCoordinates:any = [];
      const rightLabelCoordinates:any = [];

      // Calcul du point central du pie chart
      const chartCenterPoint = {
        x:
          (chart.chartArea.right - chart.chartArea.left) / 2 +
          chart.chartArea.left,
        y:
          (chart.chartArea.bottom - chart.chartArea.top) / 2 +
          chart.chartArea.top
      };

      // Itération à travers chaque étiquette dans les données du graphique
      chart.config.data.labels.forEach((label: any, i: string | number) => {
        // Fonction pour obtenir une coordonnée Y adaptée pour l'étiquette
        const getSuitableY = (y: any, yArray = [], direction: string) => {
          let result = y;
          yArray.forEach((existedY) => {
            if (existedY - 14 < result && existedY + 14 > result) {
              if (direction === "right") {
                result = existedY + 14;
              } else {
                result = existedY - 14;
              }
            }
          });
          return result;
        };
      
        // Fonction pour calculer les points d'origine pour dessiner des lignes
        const getOriginPoints = (source: { x: any; y: any; }, center: { x: number; y: number; }, l: number) => {
          let a = {x: 0, y: 0};
          var dx = (center.x - source.x) / l
          var dy = (center.y - source.y) / l
          a.x = center.x + l * dx
          a.y = center.y + l * dy
          return a
        };

        // Extraction de métadonnées, d'arc et d'ensemble de données pour l'étiquette actuelle
        const meta = chart.getDatasetMeta(0);
        const arc = meta.data[i];
        const dataset = chart.config.data.datasets[0];

        // Calcul du point central de l'arc actuel
        const centerPoint = arc.getCenterPoint();

        // Extraction de la couleur et de la couleur de l'étiquette de la configuration du graphique
        let color = chart.config._config.data.datasets[0].backgroundColor[i];
        let labelColor = chart.config._config.data.datasets[0].backgroundColor[i];

        // Calcul de l'angle entre le centre du pie chart et l'arc actuel
        const angle = Math.atan2(
          centerPoint.y - chartCenterPoint.y,
          centerPoint.x - chartCenterPoint.x
        );

        // Calcul du point d'origine pour dessiner des lignes
        let originPoint = getOriginPoints(chartCenterPoint, centerPoint, arc.outerRadius)
        const point2X =
          chartCenterPoint.x + Math.cos(angle) * (centerPoint.x < chartCenterPoint.x ? arc.outerRadius + 10 : arc.outerRadius + 10);
        let point2Y =
          chartCenterPoint.y + Math.sin(angle) * (centerPoint.y < chartCenterPoint.y ? arc.outerRadius + 45 : arc.outerRadius + 45);

        // Ajuster la coordonnée Y pour éviter que les étiquettes se chevauchent
        let suitableY;
        if (point2X < chartCenterPoint.x) {
          suitableY = getSuitableY(point2Y, leftLabelCoordinates, "left");
        } else {
          suitableY = getSuitableY(point2Y, rightLabelCoordinates, "right");
        }
        point2Y = suitableY;

        // Extraction de la valeur pour l'étiquette actuelle
        let value = dataset.data[i];

        // Calcul de la coordonnée X pour le point de bord de l'étiquette
        let edgePointX = point2X < chartCenterPoint.x ? chartCenterPoint.x - arc.outerRadius - 20 : chartCenterPoint.x + arc.outerRadius + 20;

        // Stocker la coordonnée Y en fonction de la position de l'étiquette
        if (point2X < chartCenterPoint.x) {
          leftLabelCoordinates.push(point2Y);
        } else {
          rightLabelCoordinates.push(point2Y);
        }

        // Logique de dessin pour les lignes et les étiquettes
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(originPoint.x, originPoint.y);
        ctx.lineTo(point2X, point2Y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(point2X, point2Y);
        ctx.lineTo(edgePointX, point2Y);
        ctx.stroke();
        
        // Déterminer l'alignement de l'étiquette et calculer les coordonnées de l'étiquette
        const labelAlignStyle = edgePointX < chartCenterPoint.x ? "right" : "left";
        const labelX = edgePointX < chartCenterPoint.x ? edgePointX : edgePointX + 0;
        const labelY = point2Y + 7;
        const percentage = ((dataset.data[i] / dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(2);

        // Définir les propriétés de texte et dessiner l'étiquette
        ctx.textAlign = labelAlignStyle;
        ctx.textBaseline = "bottom";
        ctx.font = "bold 13px Lato";
        ctx.fillText(`${label}: ${percentage}%`, labelX, labelY);
      });  
    },
  };


  // Fonction pour créer le graphique en secteurs (createNormalePieChart chart)
  createNormalePieChart() {
    const normalepiechartCtx = document.getElementById('normalepiechart') as HTMLCanvasElement;
    this.chart = new Chart(normalepiechartCtx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 500, 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
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


  // Fonction pour créer le graphique en secteurs (Area chart)
  createAreaChart(): void {
        // Area Chart
        const areaCtx = document.getElementById('areaChart') as HTMLCanvasElement;
        this.chart = new Chart(areaCtx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Area Chart',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
        });
  }


  // Fonction pour créer le graphique en secteurs (Bubble chart)
  createBubbleChart(): void {
    // Bubble Chart
    const bubbleCtx = document.getElementById('bubbleChart') as HTMLCanvasElement;
    this.chart = new Chart(bubbleCtx, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'Bubble Chart',
          data: [
            { x: 20, y: 30, r: 15 },
            { x: 40, y: 10, r: 10 },
            { x: 10, y: 20, r: 8 }
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)'
        }]
      },
    });
  }



  // Fonction pour créer le graphique en secteurs (Line chart)
  createLineChart(): void {
    // Line Chart
    const lineCtx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.chart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Line Chart',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      },
    });

  }


  // Fonction pour créer le graphique en secteurs (Polar chart)
  createPolarChart(): void {
    // Polar Area Chart
    const polarCtx = document.getElementById('polarChart') as HTMLCanvasElement;
    this.chart = new Chart(polarCtx, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: 'Polar Area Chart',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
    });
  }



  // Fonction pour créer le graphique en secteurs (Radar chart)
  createRadarChart(): void {
    // Radar Chart
    const radarCtx = document.getElementById('radarChart') as HTMLCanvasElement;
    this.chart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'Radar Chart',
          data: [65, 59, 90, 81, 56, 55, 40],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
        }]
      },
    });

  }


  // Fonction pour créer le graphique en secteurs (Scatter chart)
  createScatterChart(): void {
    // Scatter Chart
    const scatterCtx = document.getElementById('scatterChart') as HTMLCanvasElement;
    this.chart = new Chart(scatterCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Chart',
          data: [
            { x: 10, y: 20 },
            { x: 15, y: 10 },
            { x: 25, y: 25 },
            { x: 30, y: 15 },
            { x: 40, y: 10 },
            { x: 50, y: 30 }
          ],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
        }]
      },
    });
  }

  
  // Fonction pour créer le graphique en secteurs (Pie chart With Plugin)
  createPieWithPluginChart(): void {
    // Obtention du contexte du canvas pour le graphique
    const piewithpluginCtx = document.getElementById('piechartwithplugin') as HTMLCanvasElement;

    // Création d'une nouvelle instance de Chart.js pour le pie chart
    this.chart = new Chart(piewithpluginCtx, {
      type: 'pie',
      data: {
        labels: this.testData.map(item => item.label),
        datasets: [{
          data: this.testData.map(item => item.value),
          backgroundColor: [
            'red',
            'blue',
            'green',
            'orange',
            'yellow',
            'purple',
            'cyan',
            'magenta',
            'brown',
            'pink'
          ]
        }]
      },
      // Utilisation du plugin personnalisé pour afficher les étiquettes en dehors du pie chart
      plugins: [ this.pieLabelsLine],
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          x: {
            display: false,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },

        plugins: {
          legend: {
            display: false,
            position: 'top',
            labels: {
              color: '#000', // spécification de la couleur de la police
              font: {
                size: 16
              }
            }
          },
        },
        layout: {
          padding: {
            left: 180,
            right: 180,
            top: 100,
            bottom: 100
          }
        }
      },

    });
  }


  // Fonction pour créer le graphique en barres (bar chart)
  createBarChart(): void {
    // Création d'une nouvelle instance de Chart.js pour le bar chart
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    this.chart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['gastro-intestinales', 'Maladies mentales ', 'Maladies infectieuses ', 'Maladies du systeme ostep-articulaires', 'Autres', 'Maladies genito-urinaires', 'chirugie mineure'],
        datasets: [
          {
            label: 'Male',
            data: [391, 1542, 80, 450, 647 ,407,115],
            backgroundColor: 'rgba(255, 99, 132, 0.5)' // Changement de couleur et de transparence pour une meilleure visualisation
          },
          {
            label: 'Female',
            data: [456, 1262, 40, 499,832 ,356,112],
            backgroundColor: 'rgba(54, 162, 235, 0.5)' // Changement de couleur et de transparence pour une meilleure visualisation
          }
        ]
      },
      options: {
        responsive: true,
        plugins:{
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#000', // spécification de la couleur de la police
              font: {
                size: 16
              }
            }
          },
        },
        
        scales: {
          y: {
            stacked: false, // Empiler les barres les unes sur les autres
            ticks: {
              stepSize: 500 // Ajuster la taille de l'étape des graduations pour une meilleure visualisation
            }
          },
          x: {
            stacked: false // Empiler les barres les unes sur les autres
          }
        }
      }
    });
  }
  

}