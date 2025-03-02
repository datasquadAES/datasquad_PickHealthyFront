import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  errorMessage: string = ' ';
  showSignup: boolean = false;
  loading: boolean = false;
  loginForm !: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder,

  ) {
    this.showSignup = this.router.url === '/signup';

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  }


  ngAfterViewInit(): void {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }


  toggleSignup() {
    this.showSignup = !this.showSignup;
    this.errorMessage = '';
    this.router.navigate([this.showSignup === true ? '/signup' : '/login']);
  }

  async onSubmit() {
    this.loading = true;

    try {
      const user = this.loginForm.value
      const isLoggedIn = await this.authService.login(user.username, user.password);

      if (!isLoggedIn) {
        this.errorMessage = 'Inicio fallido. Intente nuevamente.';
        setTimeout(() => {
          this.errorMessage = '';

        }, 4000);
      }

    } catch (error) {
      this.toastService.show('error', 'Error en el servidor', 'Intente nuevamente');

    } finally {
      this.loading = false;
    }

  }
}
