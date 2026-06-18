import {Component, effect, input, model, output} from '@angular/core';
import {FieldTree, form, FormField, FormRoot, FormValueControl, pattern, required} from '@angular/forms/signals';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { ADDRESS_DEFAULT, AddressData } from './address.model';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  imports: [FormField, FormRoot, FieldErrorComponent],
})
export class AddressFormComponent implements FormValueControl<AddressData> {

  readonly legend = input<string>('Address');

  readonly touch = output<void>();

  readonly value = model<AddressData>({ ...ADDRESS_DEFAULT });

  readonly form = form(this.value, (path) => {
    required(path.addressLine1, { message: 'Address line 1 is required.' });
    required(path.addressLine2, { message: 'Address line 2 is required.' });
    required(path.zipCode, { message: 'Zip code is required.' });
    pattern(path.zipCode, /^\d{5}(-\d{4})?$/, { message: 'Enter a valid US zip code.' });
    required(path.city, { message: 'City is required.' });
  });

  constructor() {
    effect(() => { if (this.form().touched()) this.touch.emit(); });
  }
}
