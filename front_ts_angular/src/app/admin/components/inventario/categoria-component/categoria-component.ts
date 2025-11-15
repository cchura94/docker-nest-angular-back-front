import { Component, inject, OnInit, signal } from '@angular/core';
import { Categoria } from '../../../interfaces/categoria';
import { CategoriaService } from '../../../services/categoria-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-component',
  standalone: false,
  templateUrl: './categoria-component.html',
  styleUrl: './categoria-component.scss'
})
export class CategoriaComponent implements OnInit{

  categorias = signal<Categoria[]>([]);
  visibleDiCategoria = signal<boolean>(false);

  categoriaService = inject(CategoriaService);

  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });

  ngOnInit(): void {
    this.listar();
  }

  listar(): void{
    this.categoriaService.index().subscribe(
      (data: Categoria[]) => {
        this.categorias.set(data);
      },
      (error: any) => {

      }
    );
  }

  funMostrarDialog(){
    this.visibleDiCategoria.set(true);
  }

  funGuardarCategoria(){
    let data: Categoria = {nombre: this.categoriaForm.value.nombre+"", descripcion: this.categoriaForm.value.descripcion+"" };
    this.categoriaService.store(data).subscribe(
      (res: Categoria) => {
        this.listar();
        this.visibleDiCategoria.set(false);
      }
    )
  }

}
