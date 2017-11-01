import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { UploadService } from '../services/upload.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';

@Component({
	selector: 'artist-detail',
	templateUrl: '../views/artist_detail.html',
	providers: [UserService, ArtistService]
})

export class ArtistDetailComponent implements OnInit{
	

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


		//LocalStorage
		this.identity = this._userService.getIdentity();
      	this.token = this._userService.getToken();
		this.url = GLOBAL.url;

	}


	ngOnInit(){
		console.log('artist-edit.component.ts cargado');

		this.getArtist();
	
		//Llamar a api service para obtener el artist que podemos editar

	}

	getArtist(){
		this._route.params.forEach((params: Params) => {
				let id = params['id'];

				this._artistService.getArtist(this.token, id).subscribe(
			    	response => {
			    		
			    		if(!response.artist){
			    			this._router.navigate(['/']);
			    		}else{
			    			this.artist = response.artist;

			    			//Sacar albums del artista
			    			
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

		});

	}

}
