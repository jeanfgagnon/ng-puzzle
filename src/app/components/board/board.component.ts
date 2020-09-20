import { Component, OnInit } from '@angular/core';

import { TileModel } from 'src/app/models/tile-model';
import { TileCoord } from 'src/app/models/tile-coord';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public boardSize = 4;
  public tileSize = 100;

  public board: TileModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buildBoard();
  }

  // event handlers

  public onTileClick(tile: TileModel): void {
    const tileIndex = this.board.findIndex(x => x.face === tile.face);
    const emptyIndex = this.board.findIndex(x => x.empty);

    const tileCoord = this.getCoord(tileIndex);
    const emptyCoord = this.getCoord(emptyIndex);

    const move = this.getMove(tileCoord, emptyCoord);
    if (move !== '') {
      // move possible sont: h: haut, b: bas, d: droit, g: gauche
      console.log('Move: %s', move);
      //tile.moveDirection = move;
      setTimeout(() =>
        {
          [this.board[tileIndex], this.board[emptyIndex]] = [this.board[emptyIndex], this.board[tileIndex]]
          tile.moveDirection = '';
        },
      600);
    }
  }

  // private

  private getMove(tc: TileCoord, ec: TileCoord): string {
    let rv = '';
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
    for (let i = 0; i < (this.boardSize * this.boardSize); i++) {
      const tile: TileModel = {
        face: i === 0 ? '' : i.toString(),
        color: '#000000',
        bg: i === 0 ? '#000000' : '#c0c0c0',
        hoverBg: '#e0e0e0',
        empty: i === 0,
        size: this.tileSize,
        moveDirection: ''
      };
      this.board.push(tile);
    }

    for (let i = this.board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
    }
  }

  // properties

  public get boardSide(): number {
    return (this.tileSize + 2) * this.boardSize;
  }
}
