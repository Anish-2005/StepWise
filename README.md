# 🎯 StepWise

<div align="center">

![StepWise Banner](https://img.shields.io/badge/Algorithm_Visualizer-Interactive-blue?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.1.5-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square&logo=license&logoColor=white)

**Don't just run algorithms. Understand their decision-making.**

*An interactive, step-by-step algorithm visualizer that brings computer science to life through beautiful animations and intuitive controls.*

[🚀 Live Demo](https://stepwise-demo.vercel.app) • [📖 Documentation](#documentation) • [🎮 Try It Now](#getting-started)

---

![StepWise Preview](./public/preview.gif)

*Watch algorithms think in real-time with stunning visual feedback*

</div>

## ✨ What Makes StepWise Special

StepWise transforms complex algorithms into **visual stories**. Instead of abstract code execution, you see:

- 🎯 **Step-by-step execution** with animated transitions
- 🔍 **Real-time comparisons** and data movements
- 📊 **Interactive controls** to pause, rewind, and explore
- 🎨 **Beautiful visualizations** that make learning enjoyable
- 🧠 **Algorithmic thinking** exposed through visual cues

## 🚀 Features

### 🎨 Visual Algorithm Categories

<div align="center">

| Category | Algorithms | Visual Style |
|----------|------------|--------------|
| **🔄 Sorting** | Bubble, Selection, Insertion, Merge, Quick Sort | Color-coded comparisons & swaps |
| **🕸️ Graph** | BFS, DFS, Dijkstra, A* Search | Node traversal with path highlighting |
| **🏗️ Heap** | Build, Insert, Extract, Sort, Decrease Key | Tree structure with heapify animations |

</div>

### 🎮 Interactive Controls

- **▶️ Play/Pause**: Control execution flow
- **⏭️ Step Forward**: Advance one step at a time
- **🔄 Reset**: Restart from beginning
- **⚡ Speed Control**: Adjust animation speed
- **📝 Custom Input**: Enter your own data sets

### 🎯 Key Highlights

- **📱 Responsive Design**: Works beautifully on all devices
- **⚡ Real-time Updates**: See changes as they happen
- **🎪 Smooth Animations**: 60fps animations with CSS transforms
- **🛠️ Developer Friendly**: Built with modern React patterns
- **🎨 Customizable**: Easy to extend with new algorithms

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.1.5-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-0.563.0-000000?style=for-the-badge&logo=lucide&logoColor=white)

</div>

- **Frontend**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4.0 with custom animations
- **Icons**: Lucide React for consistent iconography
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized with React 19 features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/stepwise.git
cd stepwise

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` and start visualizing algorithms! 🎉

### 📖 Usage

1. **Choose a Category**: Select Sorting, Graph, or Heap operations
2. **Pick an Algorithm**: Choose from available algorithms in each category
3. **Enter Input Data**: Use the default examples or input your own data
4. **Visualize**: Click play and watch the algorithm execute step-by-step
5. **Control**: Use pause, step forward, or reset to explore at your pace

## 📊 Supported Algorithms

### 🔄 Sorting Algorithms

| Algorithm | Time Complexity | Visual Features |
|-----------|----------------|-----------------|
| **Bubble Sort** | O(n²) | Bubble comparisons with color swaps |
| **Selection Sort** | O(n²) | Minimum element highlighting |
| **Insertion Sort** | O(n²) | Element insertion animations |
| **Merge Sort** | O(n log n) | Recursive splitting & merging |
| **Quick Sort** | O(n log n) | Pivot selection & partitioning |

### 🕸️ Graph Algorithms

| Algorithm | Use Case | Visual Features |
|-----------|----------|-----------------|
| **BFS** | Shortest path (unweighted) | Queue-based exploration |
| **DFS** | Path finding & traversal | Stack-based depth-first search |
| **Dijkstra** | Shortest path (weighted) | Distance updates & priority queue |
| **A* Search** | Heuristic pathfinding | F-score calculations & heuristics |

### 🏗️ Heap Operations

| Operation | Description | Visual Features |
|-----------|-------------|-----------------|
| **Build Heap** | Create max-heap from array | Bottom-up heapification |
| **Insert** | Add element to heap | Bubble-up animations |
| **Extract Max** | Remove maximum element | Bubble-down animations |
| **Heap Sort** | Sort using heap operations | Complete sorting visualization |

## 🎨 Customization

### Adding New Algorithms

```typescript
// In src/algorithms/yourAlgorithm.ts
export function yourAlgorithm(input: any): Step[] {
  const steps: Step[] = [];

  // Implement your algorithm
  // Add steps with visual information

  return steps;
}
```

### Styling

StepWise uses Tailwind CSS with custom CSS variables for theming:

```css
/* src/app/globals.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --animation-speed: 500ms;
}
```

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-algorithm`
3. **Implement** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Guidelines

- Follow TypeScript strict mode
- Add comprehensive tests for new algorithms
- Maintain consistent code style
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and React
- Icons by [Lucide](https://lucide.dev)
- Inspired by the beauty of algorithmic thinking

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/stepwise/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/stepwise/discussions)
- **Email**: support@stepwise.dev

---

<div align="center">

**Made with ❤️ for algorithm enthusiasts worldwide**

[⬆️ Back to Top](#-stepwise)

</div>