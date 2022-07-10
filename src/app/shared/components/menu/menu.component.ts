import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MegaMenuItem[] = [];
  public popItems: MenuItem[] = [];
  public usuario: any;
  public user!: Usuario;


  constructor(
    private _authService: AuthService, private _tokenService: TokenService

    , private _usuarioServices: UsuariosService) {

    this.usuario = '';


  }



  ngOnInit(): void {
    this.obtenerUsuario();

  }
  public obtenerMenu() {
    this.items = [

      {
        label: this.user.nombre, routerLink: ['/home']
      },
      {
        label: 'Calendario', icon: 'pi pi-calendar', routerLink: ['/contenido/calendario']
      },
      {
        label: 'Datos Respiratorios', icon: 'pi pi-sliders-h', routerLink: ['/contenido/datos-respiratorios']
      },
      {
        label: 'Actividad', icon: 'pi pi-heart-fill', routerLink: ['/contenido/actividad']
      },
      {
        label: 'Resumen', icon: 'pi pi-book', routerLink: ['/contenido/resumen']
      },
      {
        label: 'Ajustes', icon: 'pi pi-cog', routerLink: ['/contenido/ajustes']
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._tokenService.logOut()
      },

    ];

    this.popItems = [
      {
        label: "Usuario", routerLink: ['/home']
      },
      {
        label: 'Calendario', icon: 'pi pi-calendar', routerLink: ['/contenido/calendario']
      },
      {
        label: 'Datos Respiratorios', icon: 'pi pi-sliders-h', routerLink: ['/contenido/datos-respiratorios']
      },
      {
        label: 'Actividad', icon: 'pi pi-heart-fill', routerLink: ['/contenido/actividad']
      },
      {
        label: 'Resumen', icon: 'pi pi-book', routerLink: ['/contenido/resumen']
      },
      {
        label: 'Ajustes', icon: 'pi pi-cog', routerLink: ['/contenido/ajustes']
      },
      {
        label: 'Logout', icon: 'pi pi-sign-out', command: () => this._tokenService.logOut()
      },
    ]

  }

  public obtenerUsuario() {
    let usuario = this._tokenService.getUserName();

    this._usuarioServices.getUsuarioById(usuario).subscribe({
      next: (data) => {
        this.user = data;
        this.obtenerMenu();
      }

    });

  }


}
