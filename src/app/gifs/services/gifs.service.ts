import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '1PBkylOhTE1XKtZlU5bA6yRHHFQjDtcM';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // Como el constructor de angular funciona como un singleton aqui es donde se deben obtener parametros
  // del localStorage ya que se ejecuta solo una vez
  constructor(private http: HttpClient) {
    // Para poder guardar el elemento obtenido del localStorage hay que parsearlo
    // Con ! le estamos diciendo a angular que el getItem no nos retornara null nunca
    // Otra forma de hacerlo es con ?? para en caso de que sea null ponerle string vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) ?? [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) ?? [];
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    // Para ignorar diferencias entre minuscula y mayuscula
    query = query.trim().toLocaleLowerCase();

    // Comprobamos que no se insertan elementos vacios o repetidos
    if (query.trim().length !== 0 && !this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      // Guardamos los cambios en el localStorage para darle persistencia
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Consumimos la api de giphy para obtener los datos de los gifs
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });


  }
}
