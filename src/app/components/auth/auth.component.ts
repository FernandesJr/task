import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Credenciais } from '../../models/credenciais';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  public credenciais: Credenciais = {
    email: "",
    password: ""
  };

  submited = false;
  hide = true;
  errorMessage = '';

   /*Form*/
   public authForm: UntypedFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    merge(this.authForm.get(['email'])!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.authForm.get(['email'])!.hasError('required')) {
      this.errorMessage = 'Colocar um e-mail válido';
    } else if (this.authForm.get(['email'])!.hasError('email')) {
      this.errorMessage = 'Não é um e-mail válido';
    } else {
      this.errorMessage = '';
    }
  }

  private joinFormWithCredenciais() {
    this.credenciais.email = this.authForm.get(['email'])!.value;
    this.credenciais.password = this.authForm.get(['password'])!.value;
  }

  submitForm(): void {
    if(this.authForm.valid) {
      this.submited = true;
      this.joinFormWithCredenciais();
      this.service.authenticate(this.credenciais).subscribe({
        next: (res) => {
          this.service.successAuth(res.token),
          this.router.navigate(['tasks']);
        },
        error: (error) => {
          this.toastr.error('Usuário ou senha inválido.');
          console.log(error);
          this.submited = false;
        }
      });
    }
  }
}
