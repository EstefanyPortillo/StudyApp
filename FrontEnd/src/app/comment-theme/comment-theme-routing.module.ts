import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentThemePage } from './comment-theme.page';

const routes: Routes = [
  {
    path: '',
    component: CommentThemePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentThemePageRoutingModule {}
