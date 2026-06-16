import { Component, input, linkedSignal, output } from '@angular/core';
import { Course } from '../model/course';

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
