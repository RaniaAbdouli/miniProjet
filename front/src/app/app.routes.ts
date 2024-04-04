import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ListUserComponent } from './components/list-user/list-user.component';

export const routes: Routes = [

    { path: 'user', component: UserComponent },
    { path: 'listUser', component: ListUserComponent },
    {
        path: '**',
        redirectTo: 'user'
      }


];
