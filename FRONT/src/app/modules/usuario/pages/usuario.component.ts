import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  userForm: FormGroup;
  roles = ['admin', 'comprador'];
  successMessage = '';
  errorMessage = '';

  usuarios: any[] = []; // Lista para almacenar los usuarios

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUsuarios(); // Llama al método para obtener usuarios al cargar el componente
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usuarioService.registerUser(this.userForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Usuario registrado exitosamente';
          this.errorMessage = '';
          this.userForm.reset();
          this.getUsuarios(); // Actualiza la lista de usuarios después de registrar uno nuevo
        },
        error: () => {
          this.errorMessage = 'Error al registrar usuario. Intente nuevamente.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage =
        'Formulario inválido. Por favor, complete los campos correctamente.';
      this.successMessage = '';
    }
  }

  // Método para obtener usuarios
  getUsuarios() {
    this.usuarioService.getUsers().subscribe({
      next: (data) => {
        this.usuarios = data.map(({ password, ...rest }) => rest); // Excluye el campo `password`
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error al cargar los usuarios.';
      },
    });
  }
}
