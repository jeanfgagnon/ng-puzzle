import { Component, OnInit, Input, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';

import { TileModel } from 'src/app/models/tileModel';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  private _tile: TileModel;

  @Output() tileClick = new EventEmitter<TileModel>();

  constructor(
    private hostElement: ElementRef,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.hostElement.nativeElement, 'background-color', this.tile.bg);

  }

  // event handlers

  public onClick(e: Event): void {
    if (!this.tile.empty) {
      this.tileClick.emit(this.tile);
    }
  }

  public setBg(isHover: boolean): void {
    if (!this.tile.empty) {
      this.renderer.setStyle(this.hostElement.nativeElement, 'background-color', (isHover ? this.tile.hoverBg : this.tile.bg));
      this.renderer.setStyle(this.hostElement.nativeElement, 'cursor', (isHover ? 'pointer' : 'arrow'));
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
