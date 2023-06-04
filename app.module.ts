import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HumainsComponent } from './humains/humains.component';
import { HumainSearchComponent } from './humain-search/humain-search.component';
import { MessagesComponent } from './messages/messages.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HumainDetailComponent } from './humain-detail/humain-detail.component';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule
  ],
  declarations: [
    AppComponent,
    HumainsComponent,
    DashboardComponent,
    MessagesComponent,
    HumainSearchComponent,
    HumainDetailComponent,
    TeamsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
