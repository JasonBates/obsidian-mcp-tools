import type { TFile, View, WorkspaceLeaf } from "obsidian";

/**
 * Canvas node representing an element on the canvas
 */
export interface CanvasNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  nodeEl: HTMLElement;
  bbox: BBox;
  initialized: boolean;
  isContentMounted: boolean;
  /** Get bounding box for this node */
  getBBox(): BBox;
}

/**
 * Canvas edge representing a connection between nodes
 */
export interface CanvasEdge {
  id: string;
  from: { node: CanvasNode };
  to: { node: CanvasNode };
  path: { display: HTMLElement };
  /** SVG group containing the edge line/path */
  lineGroupEl: SVGElement;
  /** SVG group containing the arrow/end marker */
  lineEndGroupEl: SVGElement;
  /** Edge label element if present */
  labelElement?: {
    wrapperEl: HTMLElement;
  };
  /** Get bounding box for this edge */
  getBBox(): BBox;
  /** Get center point of the edge */
  getCenter(): { x: number; y: number };
}

/**
 * Bounding box with min/max coordinates
 */
export interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Obsidian Canvas object (internal API)
 */
export interface Canvas {
  // DOM Elements
  wrapperEl: HTMLElement;
  canvasEl: HTMLElement;

  // Node & Edge collections
  nodes: Map<string, CanvasNode>;
  edges: Map<string, CanvasEdge>;

  // Viewport state
  x: number;
  y: number;
  zoom: number;
  tx: number;
  ty: number;
  tZoom: number;
  zoomCenter: { x: number; y: number } | null;
  canvasRect: DOMRect;

  // Screenshot mode - forces full text rendering instead of placeholders
  screenshotting: boolean;

  // Viewport methods
  getViewportBBox(): BBox;
  setViewport(tx: number, ty: number, tZoom: number): void;
  zoomToFit(): void;
  zoomToSelection(): void;
  zoomToBbox(bbox: BBox): void;
  zoomToRealBbox?(bbox: BBox): void;
  markViewportChanged(): void;

  // Selection
  selection: Set<CanvasNode | CanvasEdge>;
  select(node: CanvasNode): void;
  deselectAll(): void;
  updateSelection(callback: () => void): void;
}

/**
 * Canvas view in Obsidian workspace
 */
export interface CanvasView extends View {
  file: TFile | null;
  canvas: Canvas;
}

/**
 * Type guard to check if a view is a CanvasView
 */
export function isCanvasView(view: View): view is CanvasView {
  return view.getViewType() === "canvas";
}

/**
 * Get canvas from a workspace leaf if it's a canvas view
 */
export function getCanvasFromLeaf(leaf: WorkspaceLeaf): Canvas | null {
  const view = leaf.view;
  if (isCanvasView(view)) {
    return view.canvas;
  }
  return null;
}
