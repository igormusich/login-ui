import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIdComponent } from './user-id/user-id.component';
import { ValidateCredentialsComponent } from './validate-credentials/validate-credentials.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'userId', component: UserIdComponent },
  { path: 'validate', component: ValidateCredentialsComponent },
  { path: '', redirectTo: '/userId', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
