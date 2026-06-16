import { Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { Course } from '../model/course';
import { CloseIconComponent, EditIconComponent, SaveIconComponent } from './course-dialog-icons';

type CourseFormData = {
  description: string;
  category: string;
  releasedAt: Date;
  longDescription: string;
};

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  imports: [FormField, FormRoot, EditIconComponent, CloseIconComponent, SaveIconComponent],
})
export class CourseDialogComponent {
  course = input.required<Course>();
  saved = output<CourseFormData>();
  closed = output();

  courseModel = linkedSignal<CourseFormData>(() => ({
    description: this.course().description,
    category: this.course().category,
    releasedAt: new Date(),
    longDescription: this.course().longDescription,
  }));

  close() { this.closed.emit(); }
}
