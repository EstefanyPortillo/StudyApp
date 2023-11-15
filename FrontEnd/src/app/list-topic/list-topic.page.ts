import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { RefresherCustomEvent, ToastController, IonModal, AlertController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { OverlayEventDetail } from '@ionic/core/components';
import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-topic',
  templateUrl: 'list-topic.page.html',
  styleUrls: ['list-topic.page.scss'],
})
export class ListTopicPage {
  usuarios: any = [];
  private topic_id_add = 0;
  selectedUser: number | null = null;
  @ViewChild(IonModal) modal!: IonModal; // Usa '!' para indicar que se inicializará en el constructor
  isModalOpen = false;
  topics: any = [];
  private data = inject(DataService);
  nombreUsuarioActual: string = '';
  topicsSoloListar: any = [];
  topicsShareMe: any = [];
  textoTopicosCompartidos: string = "Topicos compartidos con el usuario"

  constructor(
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }

  setOpen(isOpen: boolean, topic_selected: number) {
    this.isModalOpen = isOpen;
    this.topic_id_add = topic_selected;
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ionViewWillEnter(): void {
    this.getTopics();
    this.getUsers();
    this.getSolorListarTopics()
    this.getTopicsShareMe()
  }

  confirmar() {
    const userId = localStorage.getItem('userId');
    if (this.selectedUser !== null) {
      var data = {
        user_shared: userId,
        user_received: this.selectedUser,
        topic_id: this.topic_id_add
      }

      axios.post('http://localhost:3000/user/shared/topic/update', data, {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then(async result => {
        if (result.data.success) {
          this.getTopicsShareMe()
          await this.presentToast('Topic Compartido con Exito');
          this.router.navigate(["/list-topic"]);
        } else {
          await this.presentToast('Error ' + result.data.error);
        }
      }).catch(async error => {
        await this.presentToast('Error ' + error.message);
        console.log(error.message);
      })
    }
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  eliminar(id: any) {
    // Usar la función confirm para mostrar una ventana de confirmación al usuario
    //const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este tópico?");
    axios.delete('http://localhost:3000/topics/delete/' + id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(async result => {
      if (result.data.success) {
        await this.presentToast('Tópico Eliminado');
        this.getSolorListarTopics();
      } else {
        await this.presentToast('Error ' + result.data.error);
        console.log(result.data.error);
      }
    }).catch(async error => {
      await this.presentToast('Error ' + error.message);
      console.log(error.message);
    });

  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      position: 'top'
    })
    await toast.present();
  }

  Home() {
    this.router.navigate(["/home"]);
  }

  getTopics() {
    axios.get('http://localhost:3000/topics/list', {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.topics = result.data.topics;
      } else {
        console.log(result.data.error);
      }
    }).catch(error => {
      console.log(error.message);
    })
  }

  getUsers() {
    const userId = localStorage.getItem("userId"); // Obtiene el ID del usuario de localStorage

    axios.get('http://localhost:3000/users/list', {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.usuarios = result.data.usuarios;
        // Encuentra al usuario con el ID correspondiente
        const usuarioActual = this.usuarios.find((user: any) => user.id.toString() === userId);
        if (usuarioActual) {
          // Asigna el nombre del usuario a nombreUsuarioActual
          this.nombreUsuarioActual = `${usuarioActual.name} ${usuarioActual.last_name}`;
        }

      } else {
        console.log(result.data.error);
      }

    }).catch(error => {
      console.log(error.message);
    })
  }

  sortAZ() {
    this.topicsSoloListar.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        this.topics
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortZA() {
    this.topicsSoloListar.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortIdAsc() {
    this.topicsSoloListar.sort((a: any, b: any) => a.id - b.id);
  }

  sortIdDesc() {
    this.topicsSoloListar.sort((a: any, b: any) => b.id - a.id);
  }

  saveOrder() {
    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const orderData = this.topicsSoloListar.map((tema: any, index: any) => ({ id: tema.id, order_index: index }));

    axios.post('http://localhost:3000/topics/update-order', orderData, config)
      .then((result) => {
        if (result.data.success) {
          this.presentToast('Orden guardado con éxito');

        }
      })
      .catch((error) => {
        this.presentToast('Error al guardar el orden: ' + error.message);
      });
  }

  reorder(event: any) {
    const moverItem = this.topicsSoloListar.splice(event.detail.from, 1)[0];
    this.topicsSoloListar.splice(event.detail.to, 0, moverItem);
    event.detail.complete();
  }

  getSolorListarTopics() {
    axios.get('http://localhost:3000/topics/solo-listar', {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result => {
      if (result.data.success) {
        this.topicsSoloListar = result.data.topicos;
      } else {
        console.log(result.data.error);
      }
    }).catch(error => {
      console.log(error.message);
    });
  }

  getTopicsShareMe() {
    const user_id = localStorage.getItem('userId');

    let token = localStorage.getItem('token');
    let config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get('http://localhost:3000/topics/shared_me/' + user_id, config)
      .then((result) => {
        if (result.data.success == true) {
          this.topicsShareMe = result.data.topicos

          if (this.topicsShareMe.length == 0) {
            this.textoTopicosCompartidos = "No se compartieron topicos con el Usuario actual"
          }
        } else {
          console.log(result.data.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async confirmDelete(id: string, off: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Desea eliminar el registro?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            off == "off" ? this.eliminar(id) : this.eliminarSharedMe(id); //ternaria

            // if (off == "off") {
            //   this.eliminar(id)
            // } else {
            //   this.eliminarSharedMe(id)
            // }
          },
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          },
        },
      ],
    });
    await alert.present();
  }

  eliminarSharedMe(id: any) {
    axios.delete('http://localhost:3000/topics/delete-share-me-topics/' + id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(async result => {
      if (result.data.success) {
        await this.presentToast('Tópico Eliminado');
        this.getTopicsShareMe()
      } else {
        await this.presentToast('Error ' + result.data.error);
        console.log(result.data.error);
      }
    }).catch(async error => {
      await this.presentToast('Error ' + error.message);
      console.log(error.message);
    });

  }

}
