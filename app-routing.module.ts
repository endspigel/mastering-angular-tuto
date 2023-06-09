import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumainsComponent } from './humains/humains.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HumainDetailComponent } from './humain-detail/humain-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HumainDetailComponent },
  { path: 'humains', component: HumainsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }