import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTopicPage } from './edit-topic.page';

const routes: Routes = [
  {
    path: '',
    component: EditTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTopicPageRoutingModule {}
