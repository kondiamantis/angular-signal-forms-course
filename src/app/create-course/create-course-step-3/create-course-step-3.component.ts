import { Component, signal } from '@angular/core';
import { Lesson, Step3Data } from './step3.model';

@Component({
  selector: 'create-course-step-3',
  templateUrl: 'create-course-step-3.component.html',
  styleUrls: ['create-course-step-3.component.scss'],
})
export class CreateCourseStep3Component {
  step3Model = signal<Step3Data>({ lessons: [] });

  addLesson() {
    this.step3Model.update((m) => ({
      ...m,
      lessons: [...m.lessons, { title: '', level: 'beginner' } satisfies Lesson],
    }));
  }

  deleteLesson(i: number) {
    this.step3Model.update((m) => ({
      ...m,
      lessons: m.lessons.filter((_, idx) => idx !== i),
    }));
  }
}
