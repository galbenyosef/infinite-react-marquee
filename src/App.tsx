import React, { useState } from 'react';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { Activity, Hexagon, Zap, Shield, Sparkles, Code, Cpu, Blocks, MousePointer2, ChevronRight, Settings, Check, X, Github, Package, ExternalLink, Copy, Star, Quote } from 'lucide-react';

const REPO_URL = 'https://github.com/galbenyosef/infinite-react-marquee';
const NPM_URL = 'https://www.npmjs.com/package/infinite-react-marquee';
const INSTALL_CMD = 'npm install infinite-react-marquee';

function CopyInstallButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 bg-[#111116] border border-[#22222a] hover:border-emerald-500/40 rounded-xl px-4 py-3 font-mono text-sm text-gray-300 transition-all cursor-pointer"
    >
      <Package className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{INSTALL_CMD}</span>
      <span className="ml-2 text-xs text-gray-500 group-hover:text-emerald-400 transition-colors">
        {copied ? 'Copied!' : <Copy className="w-3.5 h-3.5" />}
      </span>
    </button>
  );
}

function Landing({ onOpenPlayground }: { onOpenPlayground: () => void }) {
  const TECH_FEATURES = [
    { text: 'GPU Accelerated', icon: <Zap className="w-5 h-5 text-amber-400" />, color: 'amber' },
    { text: 'Zero Layout Shift', icon: <Blocks className="w-5 h-5 text-blue-400" />, color: 'blue' },
    { text: '120fps Ready', icon: <Activity className="w-5 h-5 text-emerald-400" />, color: 'emerald' },
    { text: 'Motion Safe', icon: <Shield className="w-5 h-5 text-indigo-400" />, color: 'indigo' },
    { text: 'React & Tailwind', icon: <Code className="w-5 h-5 text-sky-400" />, color: 'sky' },
    { text: 'Micro-Animations', icon: <Sparkles className="w-5 h-5 text-fuchsia-400" />, color: 'fuchsia' },
    { text: 'Fully Modular', icon: <Hexagon className="w-5 h-5 text-orange-400" />, color: 'orange' },
    { text: 'Headless Core', icon: <Cpu className="w-5 h-5 text-rose-400" />, color: 'rose' },
  ];

  const BRAND_LOGOS = [
    "Acme Corp", "Lumina", "Vanguard", "Nebula", "Globex", "Initech", "Soylent", "Massive Dynamic"
  ];

  const TESTIMONIALS = [
    { quote: "Finally a marquee that doesn't break in RTL layouts.", author: "Frontend Lead" },
    { quote: "Drag support out of the box — our users love it.", author: "Product Designer" },
    { quote: "Dropped framer-motion for this. Bundle went down 30kb.", author: "Full-stack Dev" },
    { quote: "IntersectionObserver pause saved us on mobile battery.", author: "Mobile Engineer" },
    { quote: "Two kilobytes and it just works in Next.js.", author: "Next.js Developer" },
  ];

  const USE_CASES = [
    { label: 'Logo clouds', emoji: '🏢' },
    { label: 'News tickers', emoji: '📰' },
    { label: 'Testimonials', emoji: '💬' },
    { label: 'Partner strips', emoji: '🤝' },
    { label: 'Product carousels', emoji: '🛍️' },
    { label: 'Social proof', emoji: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans flex flex-col items-center py-20 px-4 sm:px-8 relative overflow-hidden">

      {/* Top nav */}
      <nav className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 py-5 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md">
        <div className="flex items-center gap-2 font-bold text-sm tracking-tight">
          <span className="text-lg">🚀</span>
          <span>Infinite React Marquee</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Package className="w-3.5 h-3.5" />
            npm
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-full font-semibold transition-colors text-xs sm:text-sm cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            Live Playground
          </button>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-3xl text-center space-y-6 mb-24 cursor-default relative z-10 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v1.0.0 RELEASE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-500">
          Infinite Scrolling,<br />Made Beautiful.
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A highly performant, accessible, and fully customizable marquee component for React. Powered by a precision <code className="text-gray-300 font-mono text-base">requestAnimationFrame</code> engine with GPU-accelerated transforms.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <CopyInstallButton />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Star className="w-4 h-4" />
            Star on GitHub
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      <div className="w-full max-w-[1400px] flex flex-col gap-16 relative z-10">
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- SCROLL LEFT (Normal, Fast) --- */}
        <div className="relative w-full">
          <InfiniteMarquee speed={50} direction="left" gap="1.5rem" fadeEdges fadeWidth="15%" pauseOnHover={false} respectReducedMotion={false}>
            {TECH_FEATURES.map((feature, i) => (
              <div key={`f-${i}`} className={`flex items-center gap-4 px-6 py-4 min-w-[240px] rounded-2xl bg-[#111116] border border-[#22222a] hover:border-${feature.color}-500/30 transition-all duration-300 cursor-grab active:cursor-grabbing shadow-xl shadow-black/50`}>
                <div className={`p-2 rounded-lg bg-${feature.color}-500/10 text-${feature.color}-400`}>
                  {feature.icon}
                </div>
                <span className="font-medium font-sans text-gray-200 tracking-wide text-sm">{feature.text}</span>
              </div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* --- SCROLL RIGHT (Brand Logos, Slower) --- */}
        <div className="relative w-full">
          <InfiniteMarquee speed={30} direction="right" gap="4rem" fadeEdges fadeWidth="15%" pauseOnHover={false} respectReducedMotion={false}>
            {BRAND_LOGOS.map((logo, i) => (
               <div key={`l-${i}`} className="flex items-center justify-center px-8 text-2xl font-bold font-sans text-gray-700 tracking-tighter uppercase whitespace-nowrap cursor-grab active:cursor-grabbing">
                 {logo}
               </div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* --- TESTIMONIALS --- */}
        <div className="relative w-full">
          <p className="text-center text-xs uppercase tracking-widest text-gray-600 mb-6 font-semibold">Social proof ticker</p>
          <InfiniteMarquee speed={25} direction="left" gap="2rem" fadeEdges fadeWidth="12%" pauseOnHover={false} respectReducedMotion={false}>
            {TESTIMONIALS.map((t, i) => (
              <div key={`t-${i}`} className="flex items-start gap-3 px-6 py-4 min-w-[320px] max-w-[360px] rounded-2xl bg-[#111116] border border-[#22222a] cursor-grab active:cursor-grabbing">
                <Quote className="w-5 h-5 text-emerald-500/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">"{t.quote}"</p>
                  <p className="text-xs text-gray-600 mt-2 font-medium">— {t.author}</p>
                </div>
              </div>
            ))}
          </InfiniteMarquee>
        </div>

        {/* --- USE CASES (vertical on desktop) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8 items-center">
          <div className="relative w-full h-[280px] rounded-3xl border border-[#22222a] bg-[#0c0c0f] overflow-hidden">
            <p className="absolute top-4 left-4 z-10 text-xs uppercase tracking-widest text-gray-600 font-semibold">Vertical scrolling</p>
            <InfiniteMarquee speed={35} direction="up" gap="1rem" fadeEdges fadeWidth="3rem" className="h-full" pauseOnHover={false} respectReducedMotion={false}>
              {USE_CASES.map((item, i) => (
                <div key={`u-${i}`} className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#111116] border border-[#22222a] cursor-grab active:cursor-grabbing">
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="font-medium text-gray-300 text-sm">{item.label}</span>
                </div>
              ))}
            </InfiniteMarquee>
          </div>
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-xl font-bold text-gray-200">Built for real products</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Horizontal, vertical, bidirectional — one component for logo walls, news tickers, testimonial rails, and partner strips.
            </p>
            <button
              onClick={onOpenPlayground}
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors cursor-pointer"
            >
              Tweak every prop live
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Comparison Section --- */}
      <div className="mt-32 w-full max-w-5xl mx-auto z-10 px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-gray-100 to-gray-400 mb-4">Engineered for the Edge Cases</h2>
           <p className="text-gray-400">Why choose this over <span className="line-through opacity-50">react-fast-marquee</span> or heavy <span className="line-through opacity-50">framer-motion</span> wrappers?</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111116] border border-[#22222a] rounded-3xl p-8 flex flex-col hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
               <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-3">Off-screen Pausing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Unlike most CSS-based marquees, we use an <code className="text-gray-300 font-mono">IntersectionObserver</code> to completely halt the 120fps <code className="text-gray-300 font-mono">requestAnimationFrame</code> loop when the marquee is out of view, saving immense CPU and battery.</p>
          </div>

          <div className="bg-[#111116] border border-[#22222a] rounded-3xl p-8 flex flex-col hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
               <MousePointer2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-3">Native Swipe & Drag</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Pure CSS implementations cannot support manual dragging without resetting scroll position. We utilize direct <code className="text-gray-300 font-mono">PointerEvents</code> translating coordinates directly to the hardware-accelerated layer with zero desync.</p>
          </div>

          <div className="bg-[#111116] border border-[#22222a] rounded-3xl p-8 flex flex-col hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
               <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-200 mb-3">RTL Bulletproof</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Many marquees break instantly in <code className="text-gray-300 font-mono">dir="rtl"</code> documents because their math assumes left-alignment. We explicitly clamp local layouts to LTR while dynamically re-applying RTL wrapping securely.</p>
          </div>
        </div>

        {/* --- Comparison Table --- */}
        <div className="mt-20 border border-[#22222a] rounded-3xl overflow-x-auto bg-[#111116]/80 backdrop-blur-sm shadow-2xl">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#22222a] bg-[#0c0c0f]">
                <th className="py-6 px-8 font-semibold text-gray-300 w-1/4">Feature Comparison</th>
                <th className="py-6 px-8 font-bold text-emerald-400 bg-emerald-500/10 w-1/4 border-b-2 border-emerald-500/50">InfiniteMarquee (Ours)</th>
                <th className="py-6 px-8 font-medium text-gray-500 w-1/4">CSS Alternatives<span className="block text-xs font-normal opacity-70 mt-1">e.g. react-fast-marquee</span></th>
                <th className="py-6 px-8 font-medium text-gray-500 w-1/4">Physics Libs<span className="block text-xs font-normal opacity-70 mt-1">e.g. framer-motion</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22222a] text-sm text-gray-400">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Interactive Swipe/Drag</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Native & Seamless</div></td>
                <td className="py-5 px-8 text-gray-600"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Not supported</div></td>
                <td className="py-5 px-8 text-amber-500/70"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Supported (Heavy)</div></td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Global RTL Support</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Bulletproof Math</div></td>
                <td className="py-5 px-8 text-red-500/70"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Broken Alignment</div></td>
                <td className="py-5 px-8 text-amber-500/70"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Requires Config</div></td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Off-screen Pausing</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Auto (Observer)</div></td>
                <td className="py-5 px-8 text-red-500/70"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Runs off-screen</div></td>
                <td className="py-5 px-8 text-gray-500"><div className="flex items-center gap-2">Manual Config</div></td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Reduced Motion Support</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Auto-detected (A11y)</div></td>
                <td className="py-5 px-8 text-amber-500/70"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Requires CSS/Prop</div></td>
                <td className="py-5 px-8 text-amber-500/70"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Partial Native</div></td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Edge Fading</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Native CSS Mask</div></td>
                <td className="py-5 px-8 text-amber-500/70"><div className="flex items-center gap-2"><Check className="w-4 h-4 shrink-0"/> Overlay Gradients</div></td>
                <td className="py-5 px-8 text-red-500/70"><div className="flex items-center gap-2"><X className="w-4 h-4 shrink-0"/> Extra CSS Reqd</div></td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Animation Engine</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300 font-mono text-xs">rAF + Direct DOM</td>
                <td className="py-5 px-8 text-gray-600 font-mono text-xs">CSS Keyframes</td>
                <td className="py-5 px-8 text-gray-600 font-mono text-xs">Complex Physics rAF</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-8 text-gray-300 font-medium whitespace-nowrap">Bundle Size</td>
                <td className="py-5 px-8 bg-emerald-500/5 text-emerald-300 font-mono text-xs">{'< 2kb'}</td>
                <td className="py-5 px-8 text-gray-600 font-mono text-xs">{'~ 3-4kb'}</td>
                <td className="py-5 px-8 text-gray-600 font-mono text-xs">{'> 30kb'}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-32 pt-10 border-t border-gray-800/50 w-full max-w-4xl flex flex-col items-center gap-6 z-10 pb-10">
         <div className="font-mono text-xs text-gray-500 bg-[#111116] border border-[#22222a] px-4 py-2 rounded-md shadow-inner">
           {'<InfiniteMarquee direction="left" speed={50} fadeEdges pauseOnHover />'}
         </div>
         <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
           <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
             <Package className="w-4 h-4" /> npm
           </a>
           <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
             <Github className="w-4 h-4" /> Source code
           </a>
           <button onClick={onOpenPlayground} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer">
             <Settings className="w-4 h-4" /> Interactive playground
           </button>
         </div>
         <p className="text-xs text-gray-600">MIT © galbenyosef</p>
      </footer>
    </div>
  );
}

function Playground({ onClose }: { onClose: () => void }) {
  const [speed, setSpeed] = useState<number>(40);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('left');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [pauseOnPress, setPauseOnPress] = useState(true);
  const [rtl, setRtl] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [fadeEdges, setFadeEdges] = useState(true);

  const isVertical = direction === 'up' || direction === 'down';

  const TECH_FEATURES = [
    { text: 'GPU Accelerated', icon: <Zap className="w-5 h-5" />, colorClass: 'bg-amber-50 text-amber-600' },
    { text: 'Zero Layout Shift', icon: <Blocks className="w-5 h-5" />, colorClass: 'bg-blue-50 text-blue-600' },
    { text: '120fps Ready', icon: <Activity className="w-5 h-5" />, colorClass: 'bg-emerald-50 text-emerald-600' },
    { text: 'Motion Safe', icon: <Shield className="w-5 h-5" />, colorClass: 'bg-indigo-50 text-indigo-600' },
    { text: 'React & Tailwind', icon: <Code className="w-5 h-5" />, colorClass: 'bg-sky-50 text-sky-600' },
    { text: 'Micro-Animations', icon: <Sparkles className="w-5 h-5" />, colorClass: 'bg-fuchsia-50 text-fuchsia-600' },
    { text: 'Fully Modular', icon: <Hexagon className="w-5 h-5" />, colorClass: 'bg-orange-50 text-orange-600' },
    { text: 'Headless Core', icon: <Cpu className="w-5 h-5" />, colorClass: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col items-center">
       {/* header with back button */}
       <nav className="h-16 w-full flex-shrink-0 flex items-center justify-between px-10 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
         <button onClick={onClose} className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
           Back to Marquee.lab
         </button>
         <div className="flex items-center gap-2">
           <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors p-2">
             <Github className="w-4 h-4" />
           </a>
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           <span className="font-bold tracking-tight uppercase text-slate-400 text-xs">Playground Mode</span>
         </div>
       </nav>

       <main className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 lg:px-6 py-4 lg:py-10 items-stretch flex-grow">
         {/* Visualizer Canvas */}
         <section className={`flex-grow flex flex-col bg-white border border-slate-200 rounded-2xl lg:rounded-[2rem] shadow-sm relative overflow-hidden p-4 lg:p-12 min-h-[350px] lg:min-h-[500px]`}>
            <div className="absolute inset-0 pointer-events-none rounded-2xl lg:rounded-[2rem] shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] border border-white" />
            
            <div className={`relative w-full flex-grow flex flex-col justify-center`}>
              
              <InfiniteMarquee 
                direction={direction} 
                speed={speed} 
                gap="1.5rem" 
                pauseOnHover={pauseOnHover}
                pauseOnPress={pauseOnPress}
                rtl={rtl}
                playing={playing}
                fadeEdges={fadeEdges}
                fadeWidth="15%"
              >
                {TECH_FEATURES.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 lg:px-6 lg:py-4 min-w-[200px] lg:min-w-[240px] w-max mx-auto bg-white border border-slate-200 rounded-xl lg:rounded-2xl shadow-sm cursor-grab active:cursor-grabbing hover:border-slate-300 transition-colors">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 ${feature.colorClass}`}>
                      {React.cloneElement(feature.icon, { className: 'w-4 h-4 lg:w-5 lg:h-5' })}
                    </div>
                    <span className="font-semibold text-slate-900 text-sm whitespace-nowrap">{feature.text}</span>
                  </div>
                ))}
              </InfiniteMarquee>
              
            </div>
         </section>

         {/* Configuration Panel */}
         <aside className="w-full lg:w-[380px] shrink-0 bg-white border border-slate-200 rounded-2xl lg:rounded-[2rem] shadow-sm p-6 lg:p-8 flex flex-col space-y-6 lg:space-y-8">
            <div className="hidden lg:block">
              <h3 className="text-lg font-bold text-slate-900">Configuration</h3>
              <p className="text-xs text-slate-500 mt-1">Updates live on the canvas</p>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {/* Speed Control */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Animation Speed</label>
                  <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{speed}px/s</span>
                </div>
                <input 
                  type="range" min="10" max="300" value={speed} 
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900" 
                />
              </div>

              {/* Direction Control */}
              <div className="space-y-3 lg:space-y-4">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Direction</label>
                <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                  {['left', 'right', 'up', 'down'].map((dir) => (
                    <button 
                      key={dir}
                      onClick={() => setDirection(dir as any)}
                      className={`px-3 py-2 lg:px-4 text-xs lg:text-sm font-semibold rounded-lg lg:rounded-xl capitalize transition-colors ${
                        direction === dir ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Advanced Interactions */}
              <div className="space-y-4 lg:space-y-5">
                <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">Interactions & Layout</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:space-y-4">
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 lg:justify-between">
                    <span className="text-sm font-semibold text-slate-700">Playing State</span>
                    <button onClick={() => setPlaying(!playing)} className={`w-10 h-5 rounded-full relative transition-colors ${playing ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${playing ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 lg:justify-between">
                    <span className="text-sm font-semibold text-slate-700">Fade Edges Map</span>
                    <button onClick={() => setFadeEdges(!fadeEdges)} className={`w-10 h-5 rounded-full relative transition-colors ${fadeEdges ? 'bg-sky-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${fadeEdges ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 lg:justify-between">
                    <span className="text-sm font-semibold text-slate-700">Pause on Hover</span>
                    <button onClick={() => setPauseOnHover(!pauseOnHover)} className={`w-10 h-5 rounded-full relative transition-colors ${pauseOnHover ? 'bg-slate-900' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${pauseOnHover ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
  
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 lg:justify-between">
                    <span className="text-sm font-semibold text-slate-700">Pause on Press</span>
                    <button onClick={() => setPauseOnPress(!pauseOnPress)} className={`w-10 h-5 rounded-full relative transition-colors ${pauseOnPress ? 'bg-slate-900' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${pauseOnPress ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
  
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3 lg:justify-between">
                    <span className="text-sm font-semibold text-slate-700">RTL Mode</span>
                    <button onClick={() => setRtl(!rtl)} className={`w-10 h-5 rounded-full relative transition-colors ${rtl ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${rtl ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Helper tip */}
              <div className="hidden lg:flex bg-blue-50/50 border border-blue-100 rounded-xl p-4 items-start gap-3 mt-4">
                <MousePointer2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  Try clicking and dragging the items in the preview area to manually scroll the marquee!
                </p>
              </div>
            </div>
         </aside>
       </main>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'playground'>('landing');

  if (view === 'playground') {
    return <Playground onClose={() => setView('landing')} />;
  }
  return <Landing onOpenPlayground={() => setView('playground')} />;
}
