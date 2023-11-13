import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentThemePage } from './comment-theme.page';

import { IonicModule } from '@ionic/angular';

import { CommentThemePageRoutingModule } from './comment-theme-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentThemePageRoutingModule
  ],
  declarations: [CommentThemePage]
})
export class CommentThemePageModule {}
