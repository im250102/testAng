import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from  './components/user_edit.component';
import { ArtistListComponent } from  './components/artist-list.component';
import { HomeComponent } from  './components/home.component';
import { ArtistAddComponent } from  './components/artist_add.component';
import { ArtistEditComponent } from  './components/artist_edit.component';
import { ArtistDetailComponent } from  './components/artist_detail.component';
import { AlbumAddComponent } from  './components/album_add.component';


@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    HomeComponent,
    AlbumAddComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
