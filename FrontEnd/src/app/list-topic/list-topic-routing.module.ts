import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTopicPage } from './list-topic.page';

const routes: Routes = [
  {
    path: '',
    component: ListTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
