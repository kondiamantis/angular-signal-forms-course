import { Component, computed, effect, input, model, output, signal } from '@angular/core';
import { HttpEventType, httpResource } from '@angular/common/http';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
  readonly requiredFileType = input<string>('');

  readonly value = signal<string | null>(null);
  readonly disabled = signal(false);
  readonly uploadProgress = signal<number | null>(null);
  readonly fileUploadError = signal(false);

  fileName = signal('');

  onClick(fileUpload: HTMLInputElement) {
    fileUpload.click();
  }

  onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.fileName.set(file.name);
    }
  }
}
