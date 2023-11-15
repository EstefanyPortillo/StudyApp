import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuarios : any = {};
  mostrarPassword: boolean = false;

  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }
  constructor( private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios.get('http://localhost:3000/users/'+ id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    }).then(result=>{
      if(result.data.success){
        if(result.data.usuario!==null){
          this.usuarios=result.data.usuario;
        }
        
      }else{
        console.log( result.data.error);
       
      }
    
    }).catch(error=>{
      console.log(error.message);
    })
  }
  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration:1500,
      position: 'top'
    })
    await toast.present();
  }
  saveUser(){
    let id=null;
    if(this.usuarios.id===0){
      id=null;
    }else{
      id=this.usuarios.id
    }
    var data={
      id:id,
      name:this.usuarios.name,
      last_name:this.usuarios.last_name,
      password:this.usuarios.password,
      email:this.usuarios.email,
      deleted:this.usuarios.deleted
    }
    axios.post('http://localhost:3000/users/update', data ,{
      headers: {
        'Authorization': localStorage.getItem("token")
      }

    }).then(async result=>{
      if(result.data.success){
        
        await this.presentToast('Usuario Guardado');
        this.usuarios=result.data.usuario;
        this.router.navigate(["/home"]);
      }else{
        await this.presentToast('Error '+result.data.error);
        
      }
    
    }).catch(async error=>{
      await this.presentToast('Error '+error.message);
      console.log(error.message);
    })
  }
  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }
}
