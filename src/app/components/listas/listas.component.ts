import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DesesosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {

  @Input() terminada=true;
  @ViewChild(IonList) ionList:IonList;

  constructor(public deseosService:DesesosService,
              private router:Router,
              private alertCtr:AlertController) {}


listaSelecionada(lista:Lista){
console.log(lista);

if (this.terminada) {
  this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
} else {
  this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
}

}

borrarLista(lista:Lista){
  this.deseosService.borrarLista(lista);
}

async editarLista(lista:Lista){

const alert = await this.alertCtr.create({
  header: 'Editar Nombre',
  inputs:[
    {
      name:'titulo',
      type:'text',
      value:lista.titulo,
      placeholder:'Nombre de la lista'
    }
],
  buttons: [
    {
      text:'Cancelar',
      role:'cancel',
      handler: ()=> {
        console.log('Cancelar');
        this.ionList.closeSlidingItems();
      }
    },
    {
      text:'Guardar',
      handler:(data) => {
        console.log(data);
        if (data.titulo.lenght===0) {
          return;
        }
        //crear lista
        this.deseosService.editarLista(lista,data.titulo);
        this.ionList.closeSlidingItems();
        
        
        //navegacion
        //this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
        
      },
    }
  ]
});

await alert.present();

}

  ngOnInit() {}

}
