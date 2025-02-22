import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        nombre1: ['', Validators.required],
        nombre2: [''],
        apellido1: ['', Validators.required],
        apellido2: [''],
        username: ['', Validators.required],
        numero_identificacion: ['', Validators.required],
        id_tipo_identificacion: ['1', Validators.required], // Default value
        id_tipo_usuario: ['1', Validators.required], // Default value
        correo_electronico: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        estado_usuario: ['activo'] // Default value
      },
      { validators: this.passwordMatchValidator }
    );
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
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }
}
