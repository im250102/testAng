import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title = 'Nachofy';
  public user: User;
  public user_register: User;
  
  //guardado en local storage, buscar ?
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService: UserService
  ){
  	this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url=GLOBAL.url;
  }

  ngOnInit(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
  }

  public onSubmit(){

  	   this._userService.signUp(this.user).subscribe(
  	   		response => {
  	   			let identity = response.user;
            this.identity = identity;

            if(!this.identity._id){
                alert("El usuario no esta identificado")
            } else {
                // Creamos session en el local storage para tener al usuario en session
                localStorage.setItem('identity', JSON.stringify(identity));

                // Conseguir token para enviarselo a cada peticion http
                this._userService.signUp(this.user, 'true').subscribe(
                    response => {
                      let token = response.token;
                      this.token = token;

                      if(this.token.lenght <= 0){
                          alert("El token no se ha generado")
                      } else {
                          // Creamos element en el local storage para tener al token disponible
                          localStorage.setItem('token', JSON.stringify(token));

                          this.user = new User('','','','','','ROLE_USER','');


                      }
                   },
                  
                  error => {
                    var errorMessage = <any> error;

                    if(errorMessage !=null){
                      var body = JSON.parse(error._body);
                      this.errorMessage = body.message;
                      console.log(error);
                    }
                  }
              );
            }
  	   		},
  	   		error => {
  	   			var errorMessage = <any> error;

  	   			if(errorMessage !=null){
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
  	   				console.log(error);
  	   			}
  	   		}
  	   	);
  }

  logOut(){

      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;

      this._router.navigate(['/']);
    
  }

  onSubmitRegister(){
      console.log(this.user_register);
  
      this._userService.register(this.user_register).subscribe(
          response => {
            let user = response.user;
            this.user_register = user;

            if(!user._id){
                this.alertRegister = "Error al registrar el usuario";
            } else {
                this.alertRegister = "El usuario se ha registrado correctamente, identificate con  " +this.user_register.email;
                this.user_register = new User('','','','','','ROLE_USER','');
            }

          },
          error => {

            var errorMessage = <any> error;

            if(errorMessage !=null){
              var body = JSON.parse(error._body);
              this.alertRegister = body.message;
              console.log(error);
            }

          }

      );
  }

}
