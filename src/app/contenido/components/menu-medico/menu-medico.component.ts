import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Paciente } from 'src/app/shared/interfaces/paciente.interface';
import { Usuario } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-menu-medico',
  templateUrl: './menu-medico.component.html',
  styleUrls: ['./menu-medico.component.css']
})
export class MenuMedicoComponent implements OnInit {
  public items: MegaMenuItem[] = [];
  public popItems: MenuItem[] = [];
  public usuario!: Usuario;

  constructor(private _authService: AuthService, 
    private _tokenService: TokenService,
    
    private _usuarioServices: UsuariosService) {

    
  }



  ngOnInit(): void {
    this.obtenerUsuario();
  }
  public obtenerMenu() {
   
    this.items = [

      {
        label: this.usuario.nombre, icon: 'pi pi-user', routerLink: ['/home-medico']
      },

      {
        label: 'Ajustes', icon: 'pi pi-cog', routerLink: ['/contenido/ajustes-medico']
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._tokenService.logOut()
      },
    ];
    this.popItems = [

      {
        label: this.usuario.nombre, icon: 'pi pi-user', routerLink: ['/home-medico']
      },

      {
        label: 'Ajustes', icon: 'pi pi-cog', routerLink: ['/contenido/ajustes-medico']
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._tokenService.logOut()
      },
    ];


  }
  public obtenerUsuario() {
    let usuario = this._tokenService.getUserName();

    this._usuarioServices.getUsuarioById(usuario).subscribe({
      next: (data) => {      
        this.usuario = data;       
        this.obtenerMenu();
      }

    });

  }
}
