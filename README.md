# 📊 All-Pie Charts - Angular Chart.js Showcase

[![Angular](https://img.shields.io/badge/Angular-17.3-red.svg)](https://angular.io/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-blue.svg)](https://www.chartjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Beautiful, interactive chart visualization library built with Angular and Chart.js. A comprehensive showcase of data visualization techniques with ready-to-use code snippets for payroll and compensation analytics.

## ✨ Features

- 📈 **9+ Chart Types** - Pie, Bar, Line, Scatter, Radar, Polar, Bubble, Area charts and more
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🌓 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- 🔍 **Search & Filter** - Quickly find the chart type you need
- 📋 **Copy-Paste Ready** - One-click code snippet copying
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎯 **Interactive Examples** - Live chart rendering with real data
- 📚 **Comprehensive Docs** - Detailed documentation for each chart type
- ⚡ **Performance Optimized** - Fast rendering and smooth transitions
- 🎭 **SVG Icons** - Professional vector icons throughout

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/MarwaneLachhab/all-charts-js.git

# Navigate to project directory
cd all-charts-js

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:4200` in your browser.

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Build output will be in dist/all-pie/
```

Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 🎯 Usage

### Basic Chart Implementation

```typescript
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ctx = document.getElementById('myChart') as HTMLCanvasElement;
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3],
      backgroundColor: 'rgba(102, 240, 255, 0.6)'
    }]
  }
});
```

### Available Chart Types

| Chart Type | Use Case | Complexity |
|------------|----------|------------|
| 🥧 Pie Chart | Show proportions and percentages | Beginner |
| 📊 Bar Chart | Compare values across categories | Beginner |
| 📈 Line Chart | Display trends over time | Beginner |
| 🔵 Scatter Plot | Show correlations | Intermediate |
| 🕸️ Radar Chart | Compare multiple variables | Intermediate |
| 🎯 Polar Chart | Display cyclical data | Intermediate |
| 💭 Bubble Chart | Show 3-dimensional data | Advanced |
| 📉 Area Chart | Emphasize magnitude of change | Beginner |

## 🛠️ Tech Stack

- **Framework:** Angular 17.3
- **Charting Library:** Chart.js 4.4
- **Language:** TypeScript 5.4
- **Styling:** CSS3 with custom animations
- **Build Tool:** Angular CLI
- **Testing:** Jasmine & Karma

## 📖 Documentation

### Project Structure

```
all-pie/
├── src/
│   ├── app/
│   │   ├── all-charts-example/     # Main showcase component
│   │   ├── chart-detail/           # Individual chart detail pages
│   │   ├── components/             # Reusable components
│   │   ├── models/                 # Data models and interfaces
│   │   ├── services/               # Angular services
│   │   └── utils/                  # Chart renderers and utilities
│   ├── assets/                     # Static assets
│   └── styles.css                  # Global styles
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

### Key Features Explained

#### Chart Gallery
- Browse all available chart types on the homepage
- Each chart displayed in full-width showcase format
- Live rendering with real data

#### Search & Filter
- Search bar in navigation to filter charts
- Searches across title, description, tags, and use cases
- Instant results with smooth animations

#### Code Snippets
- Every chart includes ready-to-use code
- One-click copy functionality
- Syntax highlighting for better readability

#### Theme Support
- Dark mode (default) and light mode
- Seamless theme switching
- All charts adapt to current theme

#### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interactions

## 🎨 Customization

### Theming

The application supports light and dark themes. Colors are defined in `src/styles.css`:

```css
:root {
  --accent: #66f0ff;
  --accent-2: #ff7cd6;
  --text: #eaf1ff;
  --bg: #050914;
}
```

### Adding a New Chart

1. **Define Chart Data** in `src/app/models/chart-data.ts`
2. **Create Renderer** in `src/app/utils/chart-renderers.ts`
3. **Test the implementation**

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

### Quick Contribution Guide

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Marwane Lachhab**

- LinkedIn: [Marwane Lachhab](https://www.linkedin.com/in/marwane-lachhab/)
- GitHub: [@MarwaneLachhab](https://github.com/MarwaneLachhab)

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Amazing charting library
- [Angular](https://angular.io/) - Powerful web framework
- All contributors who help improve this project

## 🗺️ Roadmap

- [ ] Add export functionality (PNG/SVG/JSON)
- [ ] Interactive chart editor
- [ ] Chart comparison tool
- [ ] Real-time data updates
- [ ] Animation customization
- [ ] More chart templates (10+ new types)
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Integration examples (REST API, WebSocket)
- [ ] Chart performance analyzer
- [ ] Mobile app version

## 📞 Support

If you have any questions or need help:

1. Check the documentation
2. Search [existing issues](https://github.com/MarwaneLachhab/all-charts-js/issues)
3. Open a [new issue](https://github.com/MarwaneLachhab/all-charts-js/issues/new)

## FAQ

**Q: Can I use these charts in my commercial project?**  
A: Yes! This project is MIT licensed.

**Q: How do I change chart colors?**  
A: Modify the `backgroundColor` property in the chart configuration.

**Q: Can I add custom chart types?**  
A: Yes! Follow the "Adding a New Chart" guide in CONTRIBUTING.md.

**Q: Is this mobile-friendly?**  
A: Absolutely! All charts are fully responsive.

**Q: Which browsers are supported?**  
A: All modern browsers (Chrome, Firefox, Safari, Edge).

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/MarwaneLachhab/all-charts-js?style=social)
![GitHub forks](https://img.shields.io/github/forks/MarwaneLachhab/all-charts-js?style=social)

---

⭐ **Star this repo** if you find it helpful!

Made with ❤️ by Marwane Lachhab
