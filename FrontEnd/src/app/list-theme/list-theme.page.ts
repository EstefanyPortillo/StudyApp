import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-theme',
  templateUrl: 'list-theme.page.html',
  styleUrls: ['list-theme.page.scss'],
})
export class ListThemePage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
  private data = inject(DataService);
  themes: any = [];

  constructor(
    private toastController: ToastController,
    private router: Router
  ) { }


  ionViewWillEnter(): void {
    this.topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
    this.getThemes(this.topic_id);
  }
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
  ngOnInit(): void {
    this.topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
    //this.getThemes();

  }
  getMessages(): Message[] {
    return this.data.getMessages();
  }

  eliminar(id: number) {
    axios.delete(
      'http://localhost:3000/themes/delete/' + id,
      {
        headers: {
          'Authorization': localStorage.getItem("token")
        },


      }).then(async result => {
        if (result.data.success) {

          await this.presentToast('Topico Eliminado');
          this.getThemes(this.topic_id);
        } else {
          await this.presentToast('Error ' + result.data.error);
          console.log(result.data.error);

        }

      }).catch(async error => {
        await this.presentToast('Error ' + error.message);
        console.log(error.message);
      })
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'top'
    })
    await toast.present();
  }
  topicos() {

    this.router.navigate(["/list-topic"]);
  }
  getThemes(topic_id: string) {
    axios.get('http://localhost:3000/themes/list?topic_id=' + topic_id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.themes = result.data.themes;
      } else {
        console.log(result.data.error);
      }

    }).catch(error => {
      console.log(error.message);
    })
  }
}
