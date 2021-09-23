import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '1PBkylOhTE1XKtZlU5bA6yRHHFQjDtcM';
  private _historial: string[] = [];

  public resultados: any[] = [];

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
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((response: any) => {
        this.resultados = response.data;
      });


  }
}
