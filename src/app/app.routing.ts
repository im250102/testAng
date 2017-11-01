import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORT user
import { UserEditComponent } from './components/user_edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from  './components/home.component';
import { ArtistAddComponent } from  './components/artist_add.component';
import { ArtistEditComponent } from  './components/artist_edit.component';
import { ArtistDetailComponent } from  './components/artist_detail.component';

//Album
import { AlbumAddComponent } from  './components/album_add.component';

const appRoutes: Routes = [ 
	{path: '', component: HomeComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'artistas/:page', component: ArtistListComponent},
	{path: 'editar-artista/:id', component: ArtistEditComponent},
	{path: 'artista/:id', component: ArtistDetailComponent},
	{path: 'crear-artista', component: ArtistAddComponent},
	{path: 'crear-album/:artist', component: AlbumAddComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);