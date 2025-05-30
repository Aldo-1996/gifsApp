import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>; // ! operador que indica que ese atributo no va ser nulo
    
  constructor(private gifsService: GifsService){}

  buscar(){
      const valor = this.txtBuscar.nativeElement.value;
      this.gifsService.buscarGifs(valor);
      //console.log(valor);
      this.txtBuscar.nativeElement.value = '';
    }

}
