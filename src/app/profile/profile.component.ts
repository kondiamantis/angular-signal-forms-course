import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { email, form, FormField, FormRoot, readonly, required } from '@angular/forms/signals';
import { AddressFormComponent } from '../address-form/address-form.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { PROFILE_DEFAULT, ProfileData } from './profile.model';
import { ProfileAvatarIconComponent, SaveIconComponent } from './profile-icons';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [FormField, FormRoot, AddressFormComponent, FileUploadComponent, ProfileAvatarIconComponent, SaveIconComponent, JsonPipe],
})
export class ProfileComponent {

  profileModel = signal<ProfileData>({ ...PROFILE_DEFAULT });

  form = form(this.profileModel, (path) => {
    required(path.avatarUrl, { message: 'Profile picture is required.' });
    required(path.email, { message: 'Email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
    readonly(path.email);
  });

}
