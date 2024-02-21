/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../form.service';
import { QuestionTypes } from '../form.model';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  readonly QuestionTypes = QuestionTypes;

  constructor(
    private readonly modalService: NgbModal,
    private readonly router: Router,
    public readonly formService: FormService
  ) {}

  get questionList() {
    return this.formService.questionList;
  }

  get answerList() {
    return this.formService.answerList;
  }

  async openAddQuestionModal() {
    const modalRef = this.modalService.open(AddQuestionModalComponent);
    const quest = await modalRef.result;
    this.formService.addNewQuestion(quest);
  }

  getCheckboxListForm(index: number): FormGroup {
    return this.answerList.at(index) as unknown as FormGroup;
  }

  reviewUserAnswers(): void {
    if (this.answerList.length && this.answerList.valid) {
      this.router.navigateByUrl('form/answers');
    }
  }
}
