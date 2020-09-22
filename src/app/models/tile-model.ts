import { TileCoord } from './tile-coord';

export class TileModel {
  id: string;
  face: string;
  color: string;
  bg: string;
  hoverBg: string;
  size: number;
  empty: boolean;
  coords: TileCoord;
}