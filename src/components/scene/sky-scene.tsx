"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import type { SkyCanvasProps } from "./sky-canvas";

const SkyCanvas = dynamic(() => import("./sky-canvas"), { ssr: false, loading: () => null });

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SkyScene(props: SkyCanvasProps) {
  return <div className="sky-canvas" aria-hidden="true"><SceneErrorBoundary><SkyCanvas {...props} /></SceneErrorBoundary></div>;
}
