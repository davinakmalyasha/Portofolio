"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface WebGLErrorBoundaryProps {
  fallback: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
}

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  public override state: WebGLErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("WebGL error caught by boundary:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
