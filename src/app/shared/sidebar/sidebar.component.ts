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
    this.gifsService.buscarGifs(item);
  }

}
