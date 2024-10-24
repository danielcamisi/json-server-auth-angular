import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  itens: MenuItem [] | undefined;

  constructor(private router: Router){}

  ngOnInit(){
      this.itens = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: 'dashboard'
        },
        {
          label: 'Login',
          icon: 'pi pi-star',
          routerLink: 'login'
        },
        {
          label: 'Register',
          icon: 'pi pi-star',
          routerLink: 'register'
        }


      ]
  }
}
