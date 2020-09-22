import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MoveMessage } from './models/move-message';

import { TileMove } from "./TileMove";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private moveSubject = new Subject<any>();

  public sendMessage(message: MoveMessage) {
    this.moveSubject.next(message);
  }

  public clearMessages() {
    this.moveSubject.next();
  }

  public getMessage(): Observable<any> {
    return this.moveSubject.asObservable();
  }

}
