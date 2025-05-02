// src/utils/snapToGrid.ts
import type { Modifier } from '@dnd-kit/core';

export const snapToGrid: Modifier = ({ transform }) => {
  const GRID_SIZE = 120; // Each 30-minute block is 120px tall (4px/minute)
  return {
    ...transform,
    y: Math.round(transform.y / GRID_SIZE) * GRID_SIZE,
  };
};