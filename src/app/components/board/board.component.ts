import { Component, OnInit } from '@angular/core';

import { TileModel } from 'src/app/models/tileModel';

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
    console.log('on click sur %s', tile.face);
  }

  // private

  private buildBoard(): void {
    for (let i = 0; i < (this.boardSize * this.boardSize); i++) {
      const tile: TileModel = {
        face: i === 0 ? '' : i.toString(),
        color: '#000000',
        bg: i === 0 ? '#000000' : '#c0c0c0',
        hoverBg: '#e0e0e0',
        empty: i === 0,
        size: this.tileSize
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
