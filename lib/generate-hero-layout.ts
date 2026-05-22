import type { HeroItemDef, PlacedHeroItem } from "./hero-items";
import { heroItemDefs } from "./hero-items";
import { GRID_COLS, GRID_ROWS } from "./pill-theme";

const LONG_PILL_IDS = new Set([
  "postgresql",
  "manufacturing",
  "antarctica",
  "typescript",
  "full_stack",
]);

type Footprint = { cols: number; rows: number };

type GridCell = string | null;

function getFootprint(item: HeroItemDef): Footprint {
  if (item.variant === "icon-only") return { cols: 1, rows: 1 };
  if (LONG_PILL_IDS.has(item.id)) return { cols: 3, rows: 1 };
  return { cols: 2, rows: 1 };
}

function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, (): GridCell => null),
  );
}

function canPlace(
  grid: GridCell[][],
  col: number,
  row: number,
  footprint: Footprint,
): boolean {
  if (col + footprint.cols > GRID_COLS || row + footprint.rows > GRID_ROWS) {
    return false;
  }
  for (let r = row; r < row + footprint.rows; r++) {
    for (let c = col; c < col + footprint.cols; c++) {
      if (grid[r][c] !== null) return false;
    }
  }
  return true;
}

function occupy(
  grid: GridCell[][],
  col: number,
  row: number,
  footprint: Footprint,
  id: string,
) {
  for (let r = row; r < row + footprint.rows; r++) {
    for (let c = col; c < col + footprint.cols; c++) {
      grid[r][c] = id;
    }
  }
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function footprintCenterPercent(
  col: number,
  row: number,
  footprint: Footprint,
): { x: number; y: number } {
  const cellW = 100 / GRID_COLS;
  const cellH = 100 / GRID_ROWS;
  const jitterX = (Math.random() - 0.5) * cellW * 0.25;
  const jitterY = (Math.random() - 0.5) * cellH * 0.25;

  return {
    x: (col + footprint.cols / 2) * cellW + jitterX,
    y: (row + footprint.rows / 2) * cellH + jitterY,
  };
}

function getOccupiedCells(
  grid: GridCell[][],
  itemId: string,
): Array<{ col: number; row: number }> {
  const cells: Array<{ col: number; row: number }> = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c] === itemId) cells.push({ col: c, row: r });
    }
  }
  return cells;
}

/** Vecinos = pills en celdas adyacentes (8 direcciones) */
function computeGridNeighbors(
  grid: GridCell[][],
  itemId: string,
): string[] {
  const neighbors = new Set<string>();
  const cells = getOccupiedCells(grid, itemId);

  for (const { col, row } of cells) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dc === 0 && dr === 0) continue;
        const nc = col + dc;
        const nr = row + dr;
        if (nc < 0 || nc >= GRID_COLS || nr < 0 || nr >= GRID_ROWS) continue;
        const occupant = grid[nr][nc];
        if (occupant && occupant !== itemId) {
          neighbors.add(occupant);
        }
      }
    }
  }

  return [...neighbors];
}

function allAnchorPositions(footprint: Footprint): Array<{ col: number; row: number }> {
  const positions: Array<{ col: number; row: number }> = [];
  for (let row = 0; row <= GRID_ROWS - footprint.rows; row++) {
    for (let col = 0; col <= GRID_COLS - footprint.cols; col++) {
      positions.push({ col, row });
    }
  }
  return positions;
}

export function generateHeroLayout(
  items: HeroItemDef[] = heroItemDefs,
): PlacedHeroItem[] {
  const grid = createEmptyGrid();
  const placed: PlacedHeroItem[] = [];
  const shuffledItems = shuffle(items);

  for (const item of shuffledItems) {
    const footprint = getFootprint(item);
    const candidates = shuffle(allAnchorPositions(footprint));
    let slot: { col: number; row: number } | null = null;

    for (const pos of candidates) {
      if (canPlace(grid, pos.col, pos.row, footprint)) {
        slot = pos;
        break;
      }
    }

    if (!slot) {
      outer: for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
          if (grid[row][col] === null) {
            slot = { col, row };
            break outer;
          }
        }
      }
    }

    if (!slot) continue;

    const finalFootprint =
      canPlace(grid, slot.col, slot.row, footprint)
        ? footprint
        : { cols: 1, rows: 1 };

    if (!canPlace(grid, slot.col, slot.row, finalFootprint)) continue;

    occupy(grid, slot.col, slot.row, finalFootprint, item.id);
    const { x, y } = footprintCenterPercent(slot.col, slot.row, finalFootprint);

    placed.push({
      ...item,
      x,
      y,
      rotate: (Math.random() - 0.5) * 8,
      gridCol: slot.col,
      gridRow: slot.row,
      gridCols: finalFootprint.cols,
      gridRows: finalFootprint.rows,
      neighbors: [],
    });
  }

  return placed.map((item) => ({
    ...item,
    neighbors: computeGridNeighbors(grid, item.id),
  }));
}

const KNOCK_PX = 22;
const MIN_SEPARATION = 72;

function knockOffsetPx(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * KNOCK_PX,
    y: Math.sin(rad) * KNOCK_PX,
  };
}

/** x/y del layout = centro del footprint en % */
function centerPx(
  item: PlacedHeroItem,
  containerW: number,
  containerH: number,
) {
  return {
    x: (item.x / 100) * containerW,
    y: (item.y / 100) * containerH,
  };
}

export function computePillOffsets(
  layout: PlacedHeroItem[],
  hoveredId: string,
  containerW: number,
  containerH: number,
): Record<string, { x: number; y: number }> {
  const offsets: Record<string, { x: number; y: number }> = {};
  const hovered = layout.find((i) => i.id === hoveredId);
  if (!hovered) return offsets;

  const hoveredCenter = centerPx(hovered, containerW, containerH);
  const knock = knockOffsetPx(hovered.knockAngle ?? 0);
  offsets[hovered.id] = knock;

  const knockedCenter = {
    x: hoveredCenter.x + knock.x,
    y: hoveredCenter.y + knock.y,
  };

  for (const neighborId of hovered.neighbors) {
    const neighbor = layout.find((i) => i.id === neighborId);
    if (!neighbor) continue;

    const neighborCenter = centerPx(neighbor, containerW, containerH);
    const dx = neighborCenter.x - knockedCenter.x;
    const dy = neighborCenter.y - knockedCenter.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist < MIN_SEPARATION) {
      const push = ((MIN_SEPARATION - dist) / MIN_SEPARATION) * 24;
      offsets[neighborId] = {
        x: (dx / dist) * push,
        y: (dy / dist) * push,
      };
    } else {
      offsets[neighborId] = { x: 0, y: 0 };
    }
  }

  return offsets;
}
