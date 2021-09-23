import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '1PBkylOhTE1XKtZlU5bA6yRHHFQjDtcM';
  private _historial: string[] = [];

  constructor(private http: HttpClient) { }

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
    }

    // Consumimos la api de giphy para obtener los datos de los gifs
    this.http.get('api.giphy.com/v1/gifs/search?api_key=1PBkylOhTE1XKtZlU5bA6yRHHFQjDtcM&q=dbz&limit=10')
      .subscribe((response) => {
        console.log(response);
      });


  }
}
