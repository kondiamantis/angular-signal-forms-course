import { Component, signal } from '@angular/core';
import { STEP2_DEFAULT, Step2Data } from './step2.model';

@Component({
  selector: 'create-course-step-2',
  templateUrl: 'create-course-step-2.component.html',
  styleUrls: ['create-course-step-2.component.scss'],
})
export class CreateCourseStep2Component {
  step2Model = signal<Step2Data>({ ...STEP2_DEFAULT });
}
