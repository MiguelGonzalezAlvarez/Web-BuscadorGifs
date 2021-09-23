import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  constructor() { }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    // Para ignorar diferencias entre minuscula y mayuscula
    query = query.trim().toLocaleLowerCase();

    // Comprobamos que no se insertan elementos vacios o repetidos
    if (query.trim().length !== 0 && !this.historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
  }
}
