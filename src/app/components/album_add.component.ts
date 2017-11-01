import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';

import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';


@Component({
	selector: 'artist-add',
	templateUrl: '../views/album_add.html',
	providers: [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit{
	
	public title: string;
	public artist: Artist;
	public album: Album;
	public identity;
	public token;
	public alertMessage;
	public url:string;

    constructor(
    	private _route: ActivatedRoute,
    	private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService
	){
		this.title = 'Crear un nuevo album';

		//LocalStorage
		this.identity = this._userService.getIdentity();
      	this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('','','','','');
	
	}



	ngOnInit(){
		console.log('album-add.component.ts cargado');


	}


}
