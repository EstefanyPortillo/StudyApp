import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'login-user',
    loadChildren: () => import('./login/login-user.module').then( m => m.LoginUserPageModule)
  },
  {
    path: 'list-topic',
    loadChildren: () => import('./list-topic/list-topic.module').then( m => m.ListTopicPageModule)
  },
  {
    path: 'edit-topic/:id',
    loadChildren: () => import('./edit-topic/edit-topic.module').then( m => m.EditTopicPageModule)
  },
  {
    path: 'list-theme/:topic_id',
    loadChildren: () => import('./list-theme/list-theme.module').then( m => m.ListThemePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
