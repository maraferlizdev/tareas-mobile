import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/lista-item.model';
import { Lista } from 'src/app/models/lista.model';
import { DesesosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem='';

  constructor(private desesosService:DesesosService,
              private route:ActivatedRoute) {
                const listaId = this.route.snapshot.paramMap.get('listaId');
                this.lista=this.desesosService.obtenerLista(listaId);
                console.log(this.lista);
               }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem.length===0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem='';
    this.desesosService.guardarStorage();
  }

  cambioCheck(item:ListaItem){
    
    const pendientes = this.lista.items.filter(itemData=> !itemData.completado).length;
    console.log({pendientes});
    
    if (pendientes===0) {
      this.lista.terminadaEn=new Date();
      this.lista.terminada= true;
    }else{
      this.lista.terminadaEn=null;
      this.lista.terminada= false;
    }
    this.desesosService.guardarStorage();
  }

  borrarItem(index:number){
    this.lista.items.splice(index,1);
    this.desesosService.guardarStorage();

  }

}
