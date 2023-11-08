import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  usuarios : any = {};
  topics : any = {};
  selectedColor: string | undefined;


  constructor( private toastController: ToastController, private router: Router ) {}

  saveColor() {
    console.log('Color seleccionado:', this.selectedColor);
    // Aquí puedes realizar otras acciones con el código del color seleccionado
  }
  
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    axios.get('http://localhost:3000/topics/'+ id, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    }).then(result=>{
      if(result.data.success){
        if(result.data.topics!==null){
          this.topics=result.data.topics;
          this.selectedColor=result.data.topics.color;
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
  saveTopic(){
    let id=null;
    if(this.topics.id===0){
      id=null;
    }else{
      id=this.topics.id
    }
    var data={
      id:id,
      name:this.topics.name,
      order:this.topics.order,
      create_date:new Date().toISOString().substring(0, 10),
      priority:this.topics.priority,
      color:this.selectedColor,
      owner_user_id: localStorage.getItem("userId"),
      topic_id: null
    }
    axios.post('http://localhost:3000/topics/update', data ,{
      headers: {
        'Authorization': localStorage.getItem("token")
      }

    }).then(async result=>{
      if(result.data.success){
        
        await this.presentToast('Topic Guardado');
        
        this.router.navigate(["/list-topic"]);
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
