import { Component, OnInit } from '@angular/core';

import { StateService } from 'src/app/state.service';

import { TileModel } from 'src/app/models/tile-model';
import { TileCoord } from 'src/app/models/tile-coord';
import { MoveMessage } from 'src/app/models/move-message';
import { TileMove } from "src/app/TileMove";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public boardSize = 4;
  public tileSize = 150;

  public board: TileModel[] = [];

  constructor(
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.buildBoard();
  }

  // event handlers

  public onTileMoved(tile: TileModel): void {
    const tileIndex = this.board.findIndex(x => x.id === tile.id);
    const emptyIndex = this.board.findIndex(x => x.empty);

    this.board[emptyIndex].coords.x = tile.coords.x;
    this.board[emptyIndex].coords.y = tile.coords.y;

    tile.coords.x = tile.coords.fx;
    tile.coords.y = tile.coords.fy;

    [this.board[tileIndex], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[tileIndex]];
  }

  public onTileClick(tile: TileModel): void {
    const tileIndex = this.board.findIndex(x => x.face === tile.face);
    const emptyIndex = this.board.findIndex(x => x.empty);

    const tileCoord = this.getCoord(tileIndex);
    const emptyCoord = this.getCoord(emptyIndex);

    const move = this.getMove(tileCoord, emptyCoord);
    if (move !== null) {
      this.computeTileFuturePos(tile, move);
      const moveMessage: MoveMessage = {
        tileId: tile.id,
        moveDir: move
      };
      this.stateService.sendMessage(moveMessage);
      //[this.board[tileIndex], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[tileIndex]]
    }
  }

  // private

  private computeTileFuturePos(tile: TileModel, move: TileMove) {
    switch (move) {
      case 'g':
        tile.coords.fx = tile.coords.x - tile.size;
        break;

      case 'd':
        tile.coords.fx = tile.coords.x + tile.size;
        break;

      case 'h':
        tile.coords.fy = tile.coords.y - tile.size;
        break;

      case 'b':
        tile.coords.fy = tile.coords.y + tile.size;
        break;
    }
  }

  private getMove(tc: TileCoord, ec: TileCoord): TileMove | null {
    let rv: TileMove = null;
    const ydiff = tc.y - ec.y;
    const xdiff = tc.x - ec.x;

    if (Math.abs(ydiff) < 2 && Math.abs(xdiff) < 2) {
      if (ydiff === 0 || xdiff === 0) {
        if (xdiff === -1) {
          rv = 'd';
        }
        else if (xdiff === 1) {
          rv = 'g';
        }
        else if (ydiff === -1) {
          rv = 'b';
        }
        else if (ydiff === 1) {
          rv = 'h';
        }
      }
    }

    return rv;
  }

  private getCoord(index: number): TileCoord {
    const tc = new TileCoord();

    tc.y = Math.floor(index / this.boardSize);
    tc.x = (index % this.boardSize);

    return tc;
  }

  private buildBoard(): void {
    let tileIndex = 0;
    for (let y = 0; y < this.boardSize; y++) {
      for (let x = 0; x < this.boardSize; x++) {

        const tile: TileModel = {
          id: `tile${tileIndex}`,
          face: tileIndex === 0 ? '' : tileIndex.toString(),
          color: '#000000',
          bg: tileIndex === 0 ? '#000000' : '#c0c0c0',
          hoverBg: '#e0e0e0',
          empty: tileIndex === 0,
          size: this.tileSize,
          coords: {
            x: x * this.tileSize,
            fx: x * this.tileSize,
            y: y * this.tileSize,
            fy: y * this.tileSize
          }
        };

        this.board.push(tile);
        tileIndex++;
      }
    }

    this.shuffleBoard();
  }

  private shuffleBoard(): void {
    for (let src = this.board.length - 1; src > 0; src--) {
      const dst = Math.floor(Math.random() * (src + 1));
      [this.board[src], this.board[dst]] = [this.board[dst], this.board[src]];
      [this.board[dst].coords, this.board[src].coords] = [this.board[src].coords, this.board[dst].coords];
    }
  }

  // properties

  public get boardSide(): number {
    return (this.tileSize + 1) * this.boardSize;
  }
}
