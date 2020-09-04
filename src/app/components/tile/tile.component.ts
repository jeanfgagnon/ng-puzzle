import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';

import { TileModel } from 'src/app/models/tileModel';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  private _tile: TileModel;

  @Output() tileClick = new EventEmitter<TileModel>();

  constructor(private hostElement: ElementRef) { }

  ngOnInit(): void {
    this.hostElement.nativeElement.style.backgroundColor = this.tile.bg;
  }

  // event handlers

  public onClick(e: Event): void {
    if (!this.tile.empty) {
      this.tileClick.emit(this.tile);
    }
  }

  public setBg(isHover: boolean): void {
    if (!this.tile.empty) {
      this.hostElement.nativeElement.style.backgroundColor = (isHover ? this.tile.hoverBg : this.tile.bg);
      this.hostElement.nativeElement.style.cursor = (isHover ? 'pointer' : 'arrow');
    }
  }

  // properties

  @Input() public set tile(t: TileModel) {
    this._tile = t;
  }
  public get tile(): TileModel {
    return this._tile;
  }

  public get tileStyle(): object {
    return {
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-size': `${this.tile?.size / 3}px`,
      'width': `${this.tile?.size}px`,
      'height': `${this.tile?.size}px`,
      'color': this.tile?.color,
      //'background-color': this.tile?.bg
    }
  }
}
