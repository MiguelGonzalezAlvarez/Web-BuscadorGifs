import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  get historial() {
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  buscar(item: string): void {
    // Cuando el usuario pulsa en los elementos del sidebar
    // llamamos a la api de bsuqueda con el titulo del elemento
    this.gifsService.buscarGifs(item);
  }

}
