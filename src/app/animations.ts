import { trigger, state, style, transition, animate } from '@angular/animations';

export const Animations = [
  trigger('tileAnimation', [
    state('g', style({
      transform: 'translateX(0)'
    }), { params: { tileSize: 1 } }),

    state('d', style({
      transform: 'translateX(0)'
    }), { params: { tileSize: 1 } }),

    state('h', style({
      transform: 'translateY(-{{tileSize}}px)'
    }), { params: { tileSize: 1 } }),

    state('b', style({
      transform: 'translateY({{tileSize}}px)'
    }), { params: { tileSize: 1 } }),

    transition('* => g', animate('500ms ease-out', style({ left: '*', transform: 'translateX(-{{tileSize}}px)'}))),
    transition('* => d', animate('500ms ease-out', style({ left: '*', transform: 'translateX({{tileSize}}px)'}))),
    transition('* => h', animate('500ms ease-out')),
    transition('* => b', animate('500ms ease-out')),
    //transition('* => *', animate(0)),
  ]
  )
]