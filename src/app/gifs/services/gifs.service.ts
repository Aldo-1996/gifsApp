import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'HM3Pnq12NxIgQtUtvqpSk3DyFq06kN3z';
  private _servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TODO: cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial(): string[]{
    return [...this._historial];
  }

  //El metodo get en JavaScript lo toma como una propiedad -- Pilas

  constructor(private http: HttpClient){

    if (localStorage.getItem('historial') !== null){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      //this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('ultimosResultados')!) || [];
      
    }

  }

  buscarGifs(query: string){

    query = query.toLocaleLowerCase();
    if (query.trim().length === 0){
      return;
    }

    /*if (this._historial.includes(query)){
      this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('ultimosResultados', JSON.stringify(this.resultados));
        console.log(resp.data);
      });
      return;
    }*/

    /*if (this._historial.length === 10){
      return;
    }*/

    if (!this._historial.includes(query)){
  
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      //Retona un nuevo arreglo mostrando las ultimas n posiciones que 
      //especifiquen como parámetros

      localStorage.setItem('historial', JSON.stringify(this._historial)); // Se graban propiedades de tipo string
      //recibe dos propiedades, la llave y el valor
      //console.log(this._historial);

    }

    //forma de realizar peticiones en javaScript

    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=HM3Pnq12NxIgQtUtvqpSk3DyFq06kN3z&q=messi&limit=10')
    .then(resp => {
      resp.json().then(data =>{
        console.log(data);
      });
    });*/

    const params = new HttpParams()
                   .set('api_key', this._apiKey)
                   .set('limit', '10')
                   .set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, {params})
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('ultimosResultados', JSON.stringify(this.resultados));
      console.log(resp.data);
    });

  }

}
