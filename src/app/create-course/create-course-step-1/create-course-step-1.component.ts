import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CourseCategory, STEP1_DEFAULT, Step1Data } from './step1.model';

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component {
  private categoriesResource = httpResource<CourseCategory[]>(
    () => '/api/course-categories',
    { parse: (res: any) => res.categories as CourseCategory[], defaultValue: [] as CourseCategory[] }
  );
  courseCategories = this.categoriesResource.value;

  step1Model = signal<Step1Data>({ ...STEP1_DEFAULT });
}
