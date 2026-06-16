import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { LOGIN_FORM_DEFAULT, LoginData } from './login.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormField, FormRoot, FieldErrorComponent],
})
export class LoginComponent {
}
