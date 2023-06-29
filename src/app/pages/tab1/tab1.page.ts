import { Component } from '@angular/core';
import { DesesosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService:DesesosService,
              private router:Router,
              private alertCtr:AlertController) {}

  async agregarLista(){
    // this.router.navigateByUrl('tabs/tab1/agregar');
   
      const alert = await this.alertCtr.create({
        header: 'Nueva Lista',
        inputs:[
          {
            name:'titulo',
            type:'text',
            placeholder:'Nombre de la lista'
          }
      ],
        buttons: [
          {
            text:'Cancelar',
            role:'cancel',
            handler: ()=> {
              console.log('Cancelar');
            }
          },
          {
            text:'Crear',
            handler:(data) => {
              console.log(data);
              if (data.titulo.lenght===0) {
                return;
              }
              //crear lista
              const listaId=this.deseosService.crearLista(data.titulo);
              //navegacion
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
              
            },
          }
        ]
      });
    
      await alert.present();
    

  }

}
