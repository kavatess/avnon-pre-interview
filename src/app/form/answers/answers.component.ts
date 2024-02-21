/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormService } from '../form.service';
import { Router } from '@angular/router';
import { QuestionTypes } from '../form.model';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent {
  readonly QuestionTypes = QuestionTypes;

  constructor(
    public readonly formService: FormService,
    private readonly router: Router
  ) {}

  get questionList() {
    return this.formService.questionList;
  }

  getAnswer(i: number) {
    return this.formService.answerList.at(i).value as any;
  }

  backToFormBuilder() {
    this.router.navigateByUrl('form/builder');
  }
}
