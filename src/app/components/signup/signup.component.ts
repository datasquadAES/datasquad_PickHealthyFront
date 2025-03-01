import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userServices: UsersService,
    private router: Router,
    private toastService: ToastService,

  ) {}


  ngOnInit() {
    this.signupForm = this.fb.group({
      nombre1: new FormControl('', Validators.required),
      nombre2: new FormControl(''),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl(''),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      numero_identificacion: new FormControl('', Validators.required),
      id_tipo_identificacion: new FormControl('1', Validators.required), // Default value
      id_tipo_usuario: new FormControl('1', Validators.required), // Default value
      correo_electronico: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      estado_usuario: new FormControl('activo') // Default value
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;
      const userData = {
        ...formValue,
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      };

      // Remove confirmPassword as it's not needed in the API
      delete userData.confirmPassword;

      this.userServices.createUser(userData).subscribe({
        next: (data) => {
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/home']);
          this.toastService.show('success', 'Usuario añadido');
        },
        error: (err) => {
          this.toastService.show('error', err.error.message);

          alert(err.error.message);
        },
      });
    }
  }
}
