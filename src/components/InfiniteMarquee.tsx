import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';

export interface InfiniteMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  playing?: boolean;
  fadeEdges?: boolean;
  fadeWidth?: string | number;
  direction?: 'left' | 'right' | 'up' | 'down';
  speed?: number; // pixels per second
  duration?: string; // fallback to calculate speed if old duration prop used
  gap?: string;
  pauseOnHover?: boolean;
  pauseOnPress?: boolean;
  repeat?: number; // Optional override
  respectReducedMotion?: boolean;
  innerClassName?: string;
  rtl?: boolean;
}

export function InfiniteMarquee({
  children,
  playing = true,
  fadeEdges = false,
  fadeWidth = '5rem',
  direction = 'left',
  speed = 50,
  duration,
  gap = '1rem',
  pauseOnHover = true,
  pauseOnPress = true,
  repeat,
  respectReducedMotion = true,
  className = '',
  innerClassName = '',
  rtl = false,
  ...props
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);

  const [containerSize, setContainerSize] = useState(0);
  const [contentSize, setContentSize] = useState(0);
  const [repeatCount, setRepeatCount] = useState(4);

  const containerSizeRef = useRef(0);
  const contentSizeRef = useRef(0);

  const isVertical = direction === 'up' || direction === 'down';
  
  // For RTL layout, 'left' direction visually behaves like pushing items to the physical left.
  const actualDirection = rtl && !isVertical 
    ? (direction === 'left' ? 'right' : 'left') 
    : direction;
    
  const isReverse = actualDirection === 'right' || actualDirection === 'down';

  // State for interaction CSS classes
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Mutable refs for RAF loop
  const posRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isPressedRef = useRef(false);
  const autoScrollSpeedRef = useRef(speed);
  const loopWidthRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Reduced motion support for accessibility
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      
      if (mediaQuery.addEventListener) {
        const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
      }
    }
  }, []);

  // Auto calculate repeats based on sizes container/content
  const MAX_REPEAT = 50;

  const finalRepeat = repeat ?? repeatCount;

  const measureSizes = useCallback(() => {
    const container = containerRef.current;
    const item0 = item0Ref.current;
    if (!container || !item0) return;

    // For vertical layouts, prefer the parent's bounded height so content
    // doesn't drive container size and inflate repeat count in a loop.
    const parentSize = isVertical
      ? container.parentElement?.clientHeight ?? 0
      : container.parentElement?.clientWidth ?? 0;
    const selfSize = isVertical ? container.clientHeight : container.clientWidth;
    const cSize = isVertical
      ? (parentSize > 0 ? parentSize : selfSize)
      : (selfSize > 0 ? selfSize : parentSize);

    let newContent = contentSizeRef.current;
    const item1 = item1Ref.current;
    if (item1) {
      const dist = isVertical
        ? item1.offsetTop - item0.offsetTop
        : item1.offsetLeft - item0.offsetLeft;
      if (Math.abs(dist) > 0) {
        newContent = Math.abs(dist);
      }
    }
    if (newContent <= 0) {
      newContent = isVertical ? item0.offsetHeight : item0.offsetWidth;
    }

    const prevContainer = containerSizeRef.current;
    const prevContent = contentSizeRef.current;

    containerSizeRef.current = cSize;
    contentSizeRef.current = newContent;
    loopWidthRef.current = newContent;

    if (cSize > 0 && cSize !== prevContainer) setContainerSize(cSize);
    if (newContent > 0 && newContent !== prevContent) setContentSize(newContent);

    if (!repeat) {
      const nextRepeat = cSize > 0 && newContent > 0
        ? Math.min(Math.ceil(cSize / newContent) + 2, MAX_REPEAT)
        : 4;
      setRepeatCount((prev) => (prev !== nextRepeat ? nextRepeat : prev));
    }
  }, [isVertical, repeat]);

  // Sync hover via mouse events only — pointerenter sticks on touch after tap
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (pauseOnPress) setIsPressed(false);
  };

  // Sync interaction states to refs for the RAF loop
  useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);
  useEffect(() => { isPressedRef.current = isPressed; }, [isPressed]);

  // Handle auto-scroll speed translation
  useEffect(() => {
    if (duration && contentSize > 0) {
      const parsed = parseFloat(duration);
      if (parsed > 0) {
        autoScrollSpeedRef.current = contentSize / parsed;
      }
    } else {
      autoScrollSpeedRef.current = speed;
    }
  }, [speed, duration, contentSize]);

  useEffect(() => {
    loopWidthRef.current = contentSizeRef.current;
  }, [contentSize, repeatCount]);

  // Reset scroll position when orientation changes
  useEffect(() => {
    posRef.current = 0;
    containerSizeRef.current = 0;
    contentSizeRef.current = 0;
    setContainerSize(0);
    setContentSize(0);
    setRepeatCount(4);
  }, [isVertical, direction]);

  // Viewport intersection observer to pause heavy rAF offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { root: null, rootMargin: '50px', threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Measure after layout — ResizeObserver alone can fire before refs/layout are ready
  useLayoutEffect(() => {
    measureSizes();
    const frame = requestAnimationFrame(() => {
      measureSizes();
      requestAnimationFrame(measureSizes);
    });
    return () => cancelAnimationFrame(frame);
  }, [measureSizes, isVertical, direction]);

  // Size measuring via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      measureSizes();
    });

    const container = containerRef.current;
    observer.observe(container);
    if (container.parentElement) observer.observe(container.parentElement);
    if (item0Ref.current) observer.observe(item0Ref.current);
    if (item1Ref.current) observer.observe(item1Ref.current);

    return () => observer.disconnect();
  }, [isVertical, direction, measureSizes]);

  // Main 120fps Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      const width = loopWidthRef.current;
      if (width > 0 && isVisibleRef.current) {
        // Compute Translation
        if (!isDraggingRef.current) {
          const motionReduced = respectReducedMotion && reducedMotion;
          const isPaused = !playing || motionReduced || (pauseOnHover && isHoveredRef.current) || (pauseOnPress && isPressedRef.current);
          if (!isPaused) {
            const delta = (dt / 1000) * autoScrollSpeedRef.current;
            const dirMultiplier = isReverse ? 1 : -1;
            posRef.current += delta * dirMultiplier;
          }
        }

        // Apply mathematical wrapping safely
        let currentPos = posRef.current;
        if (currentPos <= -width) {
           currentPos = currentPos % width;
        } else if (currentPos > 0) {
           currentPos = (currentPos % width) - width;
        }
        posRef.current = currentPos;

        // Direct DOM update avoiding React re-renders
        if (scrollerRef.current) {
           scrollerRef.current.style.transform = isVertical
             ? `translate3d(0, ${currentPos}px, 0)`
             : `translate3d(${currentPos}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVertical, isReverse, pauseOnHover, pauseOnPress, playing, reducedMotion, respectReducedMotion]);

  // Seamless Swipe/Drag Support
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only accept primary interactions (left click or touch)
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    if (pauseOnPress) setIsPressed(true);
    isPressedRef.current = true;
    isDraggingRef.current = true;

    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = posRef.current;

    const handlePointerMove = (moveEvent: PointerEvent) => {
       const dx = moveEvent.clientX - startX;
       const dy = moveEvent.clientY - startY;
       const delta = isVertical ? dy : dx;
       // We map pointer translation directly to coordinate offset.
       posRef.current = startPos + delta;
    };

    const handlePointerUp = () => {
       isDraggingRef.current = false;
       if (pauseOnPress) setIsPressed(false);
       isPressedRef.current = false;
       window.removeEventListener('pointermove', handlePointerMove);
       window.removeEventListener('pointerup', handlePointerUp);
       window.removeEventListener('pointercancel', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  // Generate fade mask dynamically
  const maskStyle: React.CSSProperties = fadeEdges ? {
    maskImage: isVertical 
      ? `linear-gradient(to bottom, transparent 0%, black ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}, black calc(100% - ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}), transparent 100%)`
      : `linear-gradient(to right, transparent 0%, black ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}, black calc(100% - ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}), transparent 100%)`,
    WebkitMaskImage: isVertical
      ? `linear-gradient(to bottom, transparent 0%, black ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}, black calc(100% - ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}), transparent 100%)`
      : `linear-gradient(to right, transparent 0%, black ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}, black calc(100% - ${typeof fadeWidth === 'number' ? fadeWidth + 'px' : fadeWidth}), transparent 100%)`
  } : {};

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      className={`relative overflow-hidden w-full min-h-0 select-none ${pauseOnPress ? 'cursor-grab active:cursor-grabbing' : ''} ${className}`}
      {...props}
      dir="ltr"
      style={{
        ...maskStyle,
        ...props.style,
        touchAction: isVertical ? 'pan-x' : 'pan-y', // Lock touch scrolling correctly
      }}
    >
      <div
        ref={scrollerRef}
        dir="ltr" // Force LTR track rendering to keep mathematical translation predictable
        className={`flex ${isVertical ? 'flex-col h-max w-full' : 'flex-row w-max'}`}
        style={{ gap, willChange: 'transform' }}
      >
        {Array.from({ length: finalRepeat }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? item0Ref : i === 1 ? item1Ref : null}
            aria-hidden={i !== 0 ? 'true' : undefined}
            dir={rtl ? "rtl" : "ltr"} // Inject user RTL flow at the item level
            className={`flex shrink-0 gap-[var(--gap)] ${
              isVertical ? 'flex-col' : 'flex-row'
            } ${innerClassName}`}
            style={{ '--gap': gap } as React.CSSProperties} // Propagate gap internally for safe blocks
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
