import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial(): string []{
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) {}

  /*historial(): string[]{
    return this.gifsService.historial;
  }*/

  buscar(elemento: string){
    console.log(elemento);
    this.gifsService.buscarGifs(elemento);
  }

}
