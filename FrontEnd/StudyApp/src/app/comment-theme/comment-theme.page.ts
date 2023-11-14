import { CommonModule, KeyValuePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefresherCustomEvent, IonicModule, Platform, ToastController } from '@ionic/angular';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';

@Component({
  selector: 'app-comment-theme',
  templateUrl: './comment-theme.page.html',
  styleUrls: ['./comment-theme.page.scss'],
})
export class CommentThemePage implements OnInit {
  private platform = inject(Platform);
  private activatedRoute = inject(ActivatedRoute);
  topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
  theme_id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
  name = this.activatedRoute.snapshot.paramMap.get('theme_name') as string;
  keywords = this.activatedRoute.snapshot.paramMap.get('theme_keywords') as string;
  user = localStorage.getItem("userId");
  private data = inject(DataService);

  constructor(
    private toastController: ToastController,
    private router: Router
  ) { }
  themes: any = [];
  name_theme = "";
  value_theme = "";



  ionViewWillEnter(): void {
    this.theme_id = this.activatedRoute.snapshot.paramMap.get('theme_id') as string;
    this.user = localStorage.getItem("userId");
    this.getThemes(this.theme_id);
  }
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
  ngOnInit(): void {
    this.topic_id = this.activatedRoute.snapshot.paramMap.get('topic_id') as string;
  }
  getMessages(): Message[] {
    return this.data.getMessages();
  }

  eliminar(id: number) {
    axios.delete('http://localhost:3000/themes-properties/delete/' + id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(async result => {
      if (result.data.success) {

        await this.presentToast('Theme Property Eliminado');
        this.getThemes(this.theme_id)

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
  getThemes(theme_id: string) {

    axios.get('http://localhost:3000/themes-properties/list?theme_id=' + theme_id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.themes = result.data.tema_properties;
      } else {
        console.log(result.data.error);
      }

    }).catch(error => {
      console.log(error.message);
    })
  }
  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }

  saveThemeProperty() {
    var data = {
      id: null,
      property_name: this.name_theme,
      property_value: this.value_theme,
      owner_user_id: localStorage.getItem("userId"),
      theme_id: this.theme_id,
    }

    axios.post('http://localhost:3000/themes-properties/update', data, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }

    }).then(async result => {
      if (result.data.success) {

        await this.presentToast('theme Property Guardado');

        // Construye la URL con los parámetros
        //const url = `/comment-theme/${this.topic_id}/${this.theme_id}/${this.name}/${this.keywords}`;

        // Recarga la página
        //window.location.href = url;
        this.getThemes(this.theme_id)
        this.name_theme = ''
        this.value_theme = ''

      } else {
        await this.presentToast('Error ' + result.data.error);

      }

    }).catch(async error => {
      await this.presentToast('Error ' + error.message);
      console.log(error.message);
    })
  }

  volverPaginaAnterior() {
    this.router.navigate([`/list-theme/${this.topic_id}`]);
  }
}
