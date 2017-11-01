import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';

@Component({
	selector: 'artist-add',
	templateUrl: '../views/artist_add.html',
	providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit{
	
	public title: string;
	public artist: Artist;
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
		this.title = 'Crear nuevo artista';

		//LocalStorage
		this.identity = this._userService.getIdentity();
      	this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('','','');
	}


	ngOnInit(){
		console.log('artist-add.component.ts cargado');
	

	}

	onSubmit(){
		console.log(this.artist);
	    this._artistService.addArtist(this.token, this.artist).subscribe(
	    	response => {
	    		
	    		if(!response.artist){
	    			this.alertMessage = 'Error en el servidor';
	    		}else{
	    			this.alertMessage = 'El artista se ha creado correcamente';
	    			this.artist = response.artist;
	    			console.log(this.artist);
	    			this._router.navigate(['/editar-artista',response.artist._id] );
	    		}

	    	},

            error => {
				var errorMessage = <any> error;

				if(errorMessage !=null){
				  var body = JSON.parse(error._body);
				  this.alertMessage = body.message;
				  console.log(error);
				}
			}


	    );
	}

}
