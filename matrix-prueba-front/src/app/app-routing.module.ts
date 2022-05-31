import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Component } from "@angular/core";
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

const routes: Routes = [
  { path: 'view', component: ViewProfileComponent},
  { path: '**', pathMatch: 'full', redirectTo:'app'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




