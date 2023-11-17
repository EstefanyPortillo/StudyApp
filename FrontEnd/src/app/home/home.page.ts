import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  isModalOpen = false;
  selectedUser: number | null = null;
  newUser: any;
  constructor(private toastController: ToastController, private router: Router) { }
  usuarios: any = [];
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  setOpen(isOpen: boolean, topic_selected: number) {
    this.isModalOpen = isOpen;
  }

  confirmar() {
    //this.isModalOpen = false

    axios.get('http://localhost:3000/users/' + this.selectedUser, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.newUser = result.data.usuario;
        console.log(this.newUser);

      } else {
        console.log(result.data.error);

      }

    }).catch(error => {
      console.log(error.message);
    })
  }

  abrirModal() {
    this.isModalOpen = true
  }

  ionViewWillEnter(): void {
    this.getUsers();
  }
  ngOnInit(): void {
    //this.getUsers();

  }
  getMessages(): Message[] {
    return this.data.getMessages();
  }
  eliminar(id: number) {
    axios.delete('http://localhost:3000/users/delete/' + id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(async result => {
      if (result.data.success) {
        this.usuarios = result.data.usuarios;
        this.getUsers()
        await this.presentToast('Usuario Eliminado');

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
  Logout() {

    axios.post('http://localhost:3000/users/logout', {}, {
      headers: {
        'authorization': localStorage.getItem("token")
      },

    }).then(async result => {
      if (result.data.success) {

        await this.presentToast('Usuario Deslogueado');
        this.router.navigate(["/login-user"]);
      } else {
        await this.presentToast('Error ' + result.data.error);

      }

    }).catch(async error => {
      await this.presentToast('Error ' + error.message);
      console.log(error.message);
    })
  }
  getUsers() {
    axios.get('http://localhost:3000/users/list', {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.usuarios = result.data.usuarios;
      } else {
        console.log(result.data.error);
      }

    }).catch(error => {
      console.log(error.message);
    })
  }
}
