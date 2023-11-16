import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-theme',
  templateUrl: './edit-theme.page.html',
  styleUrls: ['./edit-theme.page.scss'],
})
export class EditThemePage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuarios : any = {};
  themes : any = {};
  topic_id =   this.activatedRoute.snapshot.paramMap.get('topic_id') as string;

  constructor( private toastController: ToastController, private router: Router ) {}
  
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
   
    axios.get('http://localhost:3000/themes/'+ id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    }).then(result=>{
      if(result.data.success){
        if(result.data.themes!==null){
          this.themes=result.data.themes;
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
  saveTheme(){
    let id=null;
    if(this.themes.id===0){
      id=null;
    }else{
      id=this.themes.id
    }
    var data={
      id:id,
      name:this.themes.name,
      description:this.themes.description,
      create_date:new Date().toISOString().substring(0, 10),
      keywords:this.themes.keywords,
      owner_user_id: localStorage.getItem("userId"),
      topic_id: this.topic_id,
      avatar: ''
    }
    axios.post('http://localhost:3000/themes/update', data ,{
      headers: {
        'Authorization': localStorage.getItem("token")
      }

    }).then(async result=>{
      if(result.data.success){
        
        await this.presentToast('theme Guardado');
        
        this.router.navigate(["/list-theme/"+this.topic_id]);
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
    return isIos ? 'Atrás' : '';
  }
}
