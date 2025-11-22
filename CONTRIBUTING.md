# Contributing to All-Pie Charts

First off, thank you for considering contributing to All-Pie Charts! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Adding a New Chart](#adding-a-new-chart)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear descriptive title**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear descriptive title**
- **Detailed description** of the proposed functionality
- **Use cases** explaining why this would be useful
- **Possible implementation** if you have ideas

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues for beginners
- `help wanted` - Issues where we need help
- `documentation` - Documentation improvements

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Setup Steps

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/all-charts-js.git
cd all-charts-js
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a branch**

```bash
git checkout -b feature/your-feature-name
```

4. **Start development server**

```bash
npm start
```

5. **Make your changes**

6. **Test your changes**

```bash
npm test
npm run lint
```

7. **Commit your changes**

```bash
git add .
git commit -m "feat: add amazing new feature"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## Pull Request Process

1. **Update documentation** if you're adding features
2. **Add tests** for new functionality
3. **Ensure all tests pass** (`npm test`)
4. **Update CHANGELOG.md** with your changes
5. **Submit the PR** with a clear title and description

### PR Title Format

```
<type>(<scope>): <subject>

Example:
feat(charts): add doughnut chart visualization
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Browser compatibility checked

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Style Guidelines

### TypeScript Style Guide

```typescript
// ✅ Good
export interface ChartData {
  id: string;
  title: string;
  data: number[];
}

function renderChart(canvas: HTMLCanvasElement): Chart<any, any, any> {
  return new Chart(canvas, {
    type: 'bar',
    data: chartData
  });
}

// ❌ Bad
export interface chartdata {
  ID: string
  Title: string
  Data: number[]
}

function RenderChart(Canvas: any) {
  return new Chart(Canvas, {type: "bar", data: chartData});
}
```

### Angular Style Guide

Follow the [official Angular Style Guide](https://angular.io/guide/styleguide):

- Use kebab-case for component selectors
- Use camelCase for property names
- Use PascalCase for class names
- One component per file
- Use TypeScript strict mode

### CSS Style Guide

```css
/* ✅ Good - BEM-like naming */
.chart-showcase {
  display: flex;
}

.chart-showcase__header {
  margin-bottom: 20px;
}

.chart-showcase--featured {
  border: 2px solid var(--accent);
}

/* ❌ Bad */
.ChartShowcase {
  display: flex;
}

.chart_showcase_header {
  margin-bottom: 20px;
}
```

### Commit Message Guidelines

```bash
# ✅ Good
feat(charts): add line chart with gradient fill
fix(navigation): resolve mobile menu toggle issue
docs(readme): update installation instructions

# ❌ Bad
update stuff
fix bug
changes
```

## Adding a New Chart

### Step 1: Define Chart Data

Add to `src/app/models/chart-data.ts`:

```typescript
{
  id: 'myChart',
  title: 'My Awesome Chart',
  tag: 'Visualization',
  about: 'Clear description of what the chart shows',
  why: 'Explain when and why to use this chart',
  snippet: `const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'bar',
  data: { /* ... */ }
});`,
  docPoints: [
    'Best for showing X type of data',
    'Works well with Y scenarios',
    'Consider Z when implementing'
  ]
}
```

### Step 2: Create Renderer Function

Add to `src/app/utils/chart-renderers.ts`:

```typescript
function renderMyChart(canvas: HTMLCanvasElement): Chart<any, any, any> {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Label 1', 'Label 2'],
      datasets: [{
        label: 'Dataset',
        data: [10, 20],
        backgroundColor: 'rgba(102, 240, 255, 0.6)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Add to exports
export const chartRenderers = {
  myChart: renderMyChart,
  // ... other charts
};
```

### Step 3: Add Tests

Create `src/app/utils/chart-renderers.spec.ts`:

```typescript
describe('renderMyChart', () => {
  it('should create a chart instance', () => {
    const canvas = document.createElement('canvas');
    const chart = renderMyChart(canvas);
    expect(chart).toBeDefined();
    expect(chart.config.type).toBe('bar');
  });
});
```

### Step 4: Update Documentation

Add entry to chart types table in README.md

## Review Process

1. **Automated checks** run on PR submission
2. **Code review** by maintainers (usually within 48 hours)
3. **Address feedback** if requested
4. **Approval and merge** once all checks pass

## Recognition

Contributors are recognized in:

- README.md Contributors section
- Release notes
- Special thanks in documentation

## Questions?

Feel free to:

- Open an issue with the `question` label
- Contact the maintainer on [LinkedIn](https://www.linkedin.com/in/marwane-lachhab/)
- Start a [discussion](https://github.com/MarwaneLachhab/all-charts-js/discussions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for making All-Pie Charts better! 🚀
