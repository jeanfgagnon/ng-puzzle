import { AnimationBuilder, style, animate, keyframes, AnimationStyleMetadata, AnimationMetadata } from '@angular/animations';
import { Component, OnInit, Input, ElementRef, EventEmitter, Output, Renderer2, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

import { MoveMessage } from 'src/app/models/move-message';
import { TileModel } from 'src/app/models/tile-model';
import { StateService } from 'src/app/state.service';
import { TileMove } from 'src/app/TileMove';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements AfterViewInit, OnDestroy {

  private subSub = new Subject();
  private _tile: TileModel;

  @Output() tileClick = new EventEmitter<TileModel>();
  @Output() moveDone = new EventEmitter<TileModel>();

  @ViewChild('tileDiv') tileDiv: ElementRef;

  constructor(
    private stateService: StateService,
    private renderer: Renderer2,
    private animBuilder: AnimationBuilder
  ) {
    this.stateService.getMessage().pipe(takeUntil(this.subSub)).subscribe((msg: MoveMessage) => {
      if (this.tile.id === msg.tileId) {
        this.animate(msg.moveDir);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.renderer.setStyle(this.tileDiv.nativeElement, 'background-color', this.tile.bg);
  }

  public ngOnDestroy(): void {
    this.subSub.next();
    this.subSub.complete();
  }

  // event handlers

  public onClick(e: Event): void {
    if (!this.tile.empty) {
      this.tileClick.emit(this.tile);
    }
  }

  public setBg(isHover: boolean): void {
    if (!this.tile.empty) {
      this.renderer.setStyle(this.tileDiv.nativeElement, 'background-color', (isHover ? this.tile.hoverBg : this.tile.bg));
      this.renderer.setStyle(this.tileDiv.nativeElement, 'cursor', (isHover ? 'pointer' : 'arrow'));
    }
  }

  // privates

  private animate(move: TileMove): void {
    const tileAnimationStyleMetadata = this.getMetadata(move);

    const animFactory = this.animBuilder.build([
      style({
        left: `${this.tile.coords.x}px`,
        top: `${this.tile.coords.y}px`,
        filter: 'brightness(1)'
      }),
      animate(300, keyframes(tileAnimationStyleMetadata))
    ]);

    const player = animFactory.create(this.tileDiv.nativeElement);

    player.onDone(() => {
      this.moveDone.emit(this.tile);
      player.destroy();
    });

    player.play();
  }

  private getMetadata(move: TileMove): AnimationStyleMetadata[] {

    let meta: AnimationStyleMetadata[];
    let stepette: number;

    if (move === "g" || move === "d") {
      if (move === "g") {
        stepette = this.tile.coords.fx + (this.tile.size / 10);
      }
      else {
        stepette = this.tile.coords.fx - (this.tile.size / 10);
      }

      meta = [
        style({
          left: `${this.tile.coords.fx}px`,
          filter: 'brightness(.75)'
        }),
        style({
          left: `${stepette}px`,
          filter: 'brightness(1)'
        }),
        style({
          transform: 'rotate(-2deg)',
          filter: 'brightness(1.15)'
        }),
        style({
          filter: 'brightness(1)'
        }),
        style({
          left: `${this.tile.coords.fx}px`,
          transform: 'rotate(2deg)',
          filter: 'brightness(.85)'
        })
      ];
    }
    else {
      if (move === "h") {
        stepette = this.tile.coords.fy + (this.tile.size / 10);
      }
      else {
        stepette = this.tile.coords.fy - (this.tile.size / 10);
      }

      meta = [
        style({
          top: `${this.tile.coords.fy}px`,
          filter: 'brightness(.75)'
        }),
        style({
          top: `${stepette}px`,
          filter: 'brightness(1)'
        }),
        style({
          transform: 'rotate(-2deg)',
          filter: 'brightness(1.15)'
        }),
        style({
          top: `${this.tile.coords.fy}px`,
          filter: 'brightness(1)'
        }),
        style({
          transform: 'rotate(2deg)',
          filter: 'brightness(.85)'
        })
      ];
    }

    return meta;
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
      'position': 'absolute',
      'top': `${this.tile?.coords.y}px`,
      'left': `${this.tile?.coords.x}px`,
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-size': `${this.tile?.size / 3}px`,
      'width': `${this.tile?.size}px`,
      'height': `${this.tile?.size}px`,
      'color': this.tile?.color,
      'z-index': `${this.tile?.empty ? 100 : 200}`
    }
  }
}
