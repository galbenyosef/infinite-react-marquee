<div align="center">
  <h1>🚀 Infinite React Marquee</h1>
  <p><b>The ultimate, hardware-accelerated, zero-dependency infinite scrolling component for React.</b></p>
  <p>
    <a href="https://www.npmjs.com/package/infinite-react-marquee"><img src="https://img.shields.io/npm/v/infinite-react-marquee.svg" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/infinite-react-marquee"><img src="https://img.shields.io/npm/dt/infinite-react-marquee.svg" alt="npm downloads"></a>
    <img src="https://img.shields.io/bundlephobia/minzip/infinite-react-marquee" alt="bundle size">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
    <a href="https://github.com/galbenyosef/infinite-react-marquee"><img src="https://img.shields.io/github/stars/galbenyosef/infinite-react-marquee?style=social" alt="GitHub stars"></a>
  </p>
  <p>
    <a href="https://galbenyosef.github.io/infinite-react-marquee/"><b>✨ Live Demo & Playground</b></a>
    ·
    <a href="https://github.com/galbenyosef/infinite-react-marquee">GitHub</a>
    ·
    <a href="https://www.npmjs.com/package/infinite-react-marquee">npm</a>
  </p>
</div>

<br />

Most marquee libraries rely on hacky CSS keyframes, heavy physics engines, or cloned DOM thrashing. **Infinite React Marquee** is explicitly engineered for production edge-cases and raw performance.

It utilizes a precision `requestAnimationFrame` engine combined with CSS 3D transforms (`translate3d`) to deliver **120fps smooth scrolling** with **zero layout shift**. It automatically handles complex DOM scenarios like RTL directionality, battery-saving off-screen pausing, and OS-level accessibility preferences.

## 🎬 Live Demo

**Try it now:** [galbenyosef.github.io/infinite-react-marquee](https://galbenyosef.github.io/infinite-react-marquee/)

The demo site includes:

- **Landing showcase** — feature cards, brand logo strip, testimonial ticker, vertical scrolling
- **Interactive playground** — tweak speed, direction, fade edges, RTL, pause-on-hover/press in real time
- **Drag to scroll** — click and swipe the marquee like a carousel

Run the demo locally:

```bash
git clone https://github.com/galbenyosef/infinite-react-marquee.git
cd infinite-react-marquee
npm install
npm run dev
```

## ✨ Key Features

- **🏎️ GPU-Accelerated**: Direct DOM translation bypassing the React render cycle. Buttery smooth 60hz/120hz output.
- **🔋 Battery Saver (IntersectionObserver)**: Automatically halts the compute loop entirely when scrolled out of the viewport.
- **🌍 Bulletproof RTL**: Safely clamps local directionality. Will not break, overflow, or gap in global `dir="rtl"` documents (e.g., Arabic, Hebrew).
- **🎛️ Native Swipe & Drag**: Fully interactive. Evaluates native `PointerEvents` to let users manually drag/swipe the marquee like a carousel.
- **🎭 Native Edge Masks**: Generates CSS `mask-image` linear gradients for perfect fade-outs that don't rely on solid color overlay DOM node hacks. Lets complex CSS backgrounds show through perfectly.
- **♿ Auto-Accessibility**: Automatically respects OS-level `prefers-reduced-motion` media queries and stops movement for motion-sensitive users.
- **📦 Zero Dependencies**: Tiny `~1.5kb` footprint. SSR-ready. Works perfectly with **Next.js**, **Remix**, **Vite**, and **Tailwind CSS**.

---

## 📦 Installation

```bash
npm install infinite-react-marquee
# or
yarn add infinite-react-marquee
# or
pnpm add infinite-react-marquee
```

## 🚀 Quick Start

```tsx
import { InfiniteMarquee } from 'infinite-react-marquee';

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <InfiniteMarquee 
        speed={50} 
        direction="left" 
        gap="2rem" 
        pauseOnHover={true}
      >
        <div className="card">Brand Logo 1</div>
        <div className="card">Brand Logo 2</div>
        <div className="card">Brand Logo 3</div>
        <div className="card">Brand Logo 4</div>
      </InfiniteMarquee>
    </div>
  );
}

export default App;
```

## 🧠 Advanced Usage (Fade Edges & Dragging)

```tsx
<InfiniteMarquee
  speed={80}
  direction="right"
  pauseOnHover={false}
  pauseOnPress={true} // Enables Swipe & Drag interactions
  fadeEdges={true}    // Enables native CSS mask fading at the edges
  fadeWidth="15%"     // Customize the width of the edge fade
  className="my-custom-wrapper-class"
>
  <img src="/sponsor-1.svg" alt="Sponsor" />
  <img src="/sponsor-2.svg" alt="Sponsor" />
</InfiniteMarquee>
```

## 🎛️ API Reference / Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `speed` | `number` | `50` | Animation speed in pixels per second. Adjust for reading comfort. |
| `direction` | `'left' \| 'right' \| 'up' \| 'down'` | `'left'` | The direction the content flows. Automatically determines horizontal vs vertical scrolling. |
| `playing` | `boolean` | `true` | Programmatically control whether the animation plays or is paused. |
| `gap` | `string` | `'1rem'` | CSS string (e.g. `20px`, `2rem`) for the gap between repeating chunk sets. |
| `fadeEdges` | `boolean` | `false` | Dynamically applies a CSS gradient mask to seamlessly fade the start and end edges. |
| `fadeWidth` | `string \| number` | `'5rem'` | The width/size of the fading edge mask (e.g., `100px`, `15%`). |
| `pauseOnHover` | `boolean` | `true` | Pauses the scrolling animation temporarily when a user hovers their mouse over the container. |
| `pauseOnPress` | `boolean` | `true` | Pauses while the mouse is clicked or screen touched. Combined with pointer events, this **enables native drag/swipe interaction**. |
| `rtl` | `boolean` | `false` | Explicit configuration for right-to-left layout synchronization if needed. Note: The component handles global RTL protection automatically via internal clamping. |
| `className` | `string` | `''` | Classes applied to the outermost wrapper container. Useful for setting overall width/height or Tailwind utility classes. |
| `innerClassName` | `string` | `''` | Classes applied directly to the internal repeating track container. |

---

## 🥊 Comparison: Why not `react-fast-marquee` or `framer-motion`?

If you've built production apps, you know the pain of marques implementations. 
- **Gestures/Dragging**: CSS-based marques (like `react-fast-marquee`) cannot support dragging/swiping natively without resetting the layout unpredictably. We manage translation via pure DOM matrix transformations.
- **RTL Safety**: Global `dir="rtl"` instantly breaks standard marquees because they assume left-alignment. We clamp the internal Flexbox engine to LTR and recalculate widths securely for right-to-left UI environments.
- **Hidden Battery Drain**: Standard CSS animations run constantly even when off-viewport. We utilize an `IntersectionObserver` to decouple the compute loop when no one is looking.
- **Weight**: Framer Motion is amazing, but pulling a physics engine in to animate a scrolling banner adds >30kb to your bundle constraint. We do it in `<2kb`.

## 🤝 Contributing

Contributions are welcome! See the [GitHub repository](https://github.com/galbenyosef/infinite-react-marquee).

```bash
git clone https://github.com/galbenyosef/infinite-react-marquee.git
cd infinite-react-marquee
npm install
npm run dev      # demo site
npm test         # unit tests
npm run build:lib # library build
```

## 🏷️ Keywords

`react`, `marquee`, `infinite scroll`, `slider`, `ticker`, `carousel`, `continuous scrolling`, `auto scroll`, `react marquee`, `react ticker`, `tailwind marquee`, `nextjs marquee`, `rtl marquee`, `accessible marquee`, `swipeable marquee`, `draggable marquee`, `gpu-accelerated`.

## License

MIT © [galbenyosef](https://github.com/galbenyosef)
