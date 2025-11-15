import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  fb = inject(FormBuilder);
  authService = inject(Auth)
  router = inject(Router)
  cargando = false;

  // FormGroup
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // FormBuilder
  loginForm2 = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  funIngresar(){

    if(this.loginForm.invalid) return;

    this.cargando = true;

    const { email, password } = this.loginForm.value;

    this.authService.login({email, password}).subscribe(
      (res: any) => {
        console.log(res);
        this.cargando = false;

        localStorage.setItem("access_token", res.access_token);

        this.router.navigate(["/admin/perfil"]);
      },
      (error) => {
        console.log(error)
        this.cargando = false

        alert("Error de Credenciales")
      }
    );
    
   /*
   this.authService.login({email, password}).subscribe({
    next: (res) => {
      this.cargando = false;
      console.log(res);
    },
    error: (err)=> {
      this.cargando = false;
      console.log(this.cargando);
      console.log(err.error);
    }
   })
   */
  }
  



}
