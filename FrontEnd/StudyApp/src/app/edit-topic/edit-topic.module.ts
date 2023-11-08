import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTopicPage } from './edit-topic.page';

import { IonicModule } from '@ionic/angular';

import { EditTopicPageRoutingModule } from './edit-topic-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTopicPageRoutingModule
  ],
  declarations: [EditTopicPage]
})
export class EditTopicPageModule {}
