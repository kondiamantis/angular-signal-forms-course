import { Component, signal } from '@angular/core';
import { applyWhen, disabled, form, FormField, hidden, max, min, required } from '@angular/forms/signals';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { FieldErrorComponent } from '../../field-error/field-error.component';
import { STEP2_DEFAULT, Step2Data } from './step2.model';

@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss'],
  imports: [FormField, FileUploadComponent, FieldErrorComponent],
})
export class CreateCourseStep2Component {
  step2Model = signal<Step2Data>({ ...STEP2_DEFAULT });
}
