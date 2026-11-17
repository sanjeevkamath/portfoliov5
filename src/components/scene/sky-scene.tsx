"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { SceneFallback } from "./scene-fallback";

const SkyCanvas = dynamic(() => import("./sky-canvas"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}

export function SkyScene() {
  return (
    <div className="sky-scene" aria-hidden="true">
      <SceneErrorBoundary>
        <SkyCanvas />
      </SceneErrorBoundary>
    </div>
  );
}
