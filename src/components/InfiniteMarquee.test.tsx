import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InfiniteMarquee } from './InfiniteMarquee';
import React from 'react';

// Help testing inner functionality that relies on layout dimensions
function mockDimensions(element: HTMLElement, width: number, height: number) {
  Object.defineProperty(element, 'offsetWidth', { configurable: true, value: width });
  Object.defineProperty(element, 'offsetHeight', { configurable: true, value: height });
}

describe('InfiniteMarquee', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <InfiniteMarquee>
        <div data-testid="child">Test Item</div>
      </InfiniteMarquee>
    );
    
    // It should render multiple clones based on the calculation, 
    // but at least we can check if it renders the child at all.
    const children = screen.getAllByTestId('child');
    expect(children.length).toBeGreaterThan(0);
    expect(children[0]).toHaveTextContent('Test Item');
  });

  it('handles pauseOnHover correctly', () => {
    render(
      <InfiniteMarquee pauseOnHover={true}>
        <div data-testid="child">Hover me</div>
      </InfiniteMarquee>
    );

    const container = screen.getAllByTestId('child')[0].parentElement?.parentElement;
    expect(container).toBeInTheDocument();
    
    // We can't easily test the internal animation loop directly without complex rAF mocking,
    // but we can trigger the events to ensure no crashes and state changes.
    act(() => {
      fireEvent.pointerEnter(container!);
    });
    // Internal state updates on pointerEnter to pause
    
    act(() => {
      fireEvent.pointerLeave(container!);
    });
    // Resumes
  });

  it('handles pauseOnPress correctly', () => {
    render(
      <InfiniteMarquee pauseOnPress={true}>
        <div data-testid="child">Press me</div>
      </InfiniteMarquee>
    );

    const container = screen.getAllByTestId('child')[0].parentElement?.parentElement?.parentElement;
    expect(container).toBeInTheDocument();

    act(() => {
      fireEvent.pointerDown(container!);
    });

    act(() => {
      // simulate drag
      fireEvent(window, new PointerEvent('pointermove', { clientX: 100 }));
    });

    act(() => {
      fireEvent(window, new PointerEvent('pointerup'));
    });
  });

  it('sets dir="ltr" on the root container for RTL math safety', () => {
    render(
      <InfiniteMarquee rtl={true} className="test-root">
        <div>Item</div>
      </InfiniteMarquee>
    );

    // Get the root container element which is rendered first with custom class
    const root = document.querySelector('.test-root');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('dir', 'ltr');
  });

  it('creates an IntersectionObserver', () => {
    const observeMock = vi.fn();
    class MockIO {
      observe = observeMock;
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    window.IntersectionObserver = MockIO as any;

    render(
      <InfiniteMarquee>
        <div>Item</div>
      </InfiniteMarquee>
    );

    // expect(window.IntersectionObserver).toHaveBeenCalled();
    expect(observeMock).toHaveBeenCalled();
  });
});
