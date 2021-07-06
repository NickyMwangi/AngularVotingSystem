import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { VotingComponent } from 'src/app/voting/voting.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'vote', component: VotingComponent },
];

@NgModule({
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    VotingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ChartsModule,
  ]
})

export class AdminLayoutModule { }
