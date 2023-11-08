import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListThemePage } from './list-theme.page';

const routes: Routes = [
  {
    path: '',
    component: ListThemePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
