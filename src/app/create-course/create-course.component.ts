import { Component, effect, Injector, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CreateCourseStep1Component } from './create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './create-course-step-2/create-course-step-2.component';
import { CreateCourseStep3Component } from './create-course-step-3/create-course-step-3.component';
import { ArrowLeftIconComponent, ArrowRightIconComponent, CheckIconComponent, CreateCourseHeroIconComponent } from './create-course-icons';

const DRAFT_KEY = 'COURSE_DRAFT';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  imports: [CreateCourseStep1Component, CreateCourseStep2Component, CreateCourseStep3Component, CreateCourseHeroIconComponent, ArrowRightIconComponent, ArrowLeftIconComponent, CheckIconComponent]
})
export class CreateCourseComponent implements AfterViewInit {

  @ViewChild('step1') step1!: CreateCourseStep1Component;
  @ViewChild('step2') step2!: CreateCourseStep2Component;
  @ViewChild('step3') step3!: CreateCourseStep3Component;

  currentStep = signal(0);

  readonly steps = [
    { label: 'Landing page' },
    { label: 'Pricing' },
    { label: 'Lessons' },
  ];

  constructor(private injector: Injector) {}

  ngAfterViewInit() {
    effect(() => {
      const dirty1 = this.step1.step1Form().dirty();
      const dirty2 = this.step2.step2Form().dirty();
      const dirty3 = this.step3.step3Form().dirty();
      if (dirty1 || dirty2 || dirty3) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({
          step1: this.step1.step1Model(),
          step2: this.step2.step2Model(),
          step3: this.step3.step3Model(),
        }));
      }
    }, { injector: this.injector });

    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      const { step1, step2, step3 } = JSON.parse(saved);
      this.step1.step1Model.set(step1);
      this.step2.step2Model.set(step2);
      this.step3.step3Model.set(step3);
    }
  }

  submit(step1: any, step2: any, step3: any) {
    console.log(step1, step2, step3);
  }
}
