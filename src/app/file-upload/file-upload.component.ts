import { Component, inject, input, signal } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
})
export class FileUploadComponent {
  private http = inject(HttpClient);

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

    if (!file) return;

    this.fileName.set(file.name);
    this.fileUploadError.set(false);
    this.value.set(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    this.http.post('/api/files/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress.set(Math.round(100 * event.loaded / event.total!));
        } else if (event.type === HttpEventType.Response) {
          this.uploadProgress.set(null);
        }
      },
      error: () => {
        this.fileUploadError.set(true);
        this.uploadProgress.set(null);
      },
    });
  }
}
