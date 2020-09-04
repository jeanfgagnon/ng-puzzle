import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { TileComponent } from './components/tile/tile.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
