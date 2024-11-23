import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
  libros = [
    { titulo: 'Harry Potter y la piedra filosofal', estado: 'Disponible', genero: 'Aventura/Ciencia ficción' },
    { titulo: 'Naruto Volumen 4', estado: 'Disponible', genero: 'Aventura/Cómics y Manga' },
    { titulo: 'Oliver Twist', estado: 'Prestado', genero: 'Aventura/Infantil' },
    { titulo: 'Guerra Mundial Z', estado: 'Prestado', genero: 'Aventura/Ciencia ficción' },
  ];
}