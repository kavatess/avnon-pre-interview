import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { QuestionTypes } from '../../form.model';


@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit, OnDestroy {
  readonly QuestionTypes = QuestionTypes;
  readonly questionForm = this.fb.group({
    question: this.fb.control('', [
      Validators.required,
      Validators.maxLength(1024),
    ]),
    type: this.fb.control(QuestionTypes.Paragraph, [Validators.required]),
    optionList: this.fb.array([], [Validators.required]),
    allowOtherAnswer: this.fb.control({ disabled: true, value: false }),
    required: this.fb.control(false),
  });
  readonly destroyed$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly activeModal: NgbActiveModal
  ) {
    this.optionListCtrl.disable();
  }

  get optionListCtrl() {
    return this.questionForm.controls.optionList;
  }

  get allowOtherAnswerCtrl() {
    return this.questionForm.controls.allowOtherAnswer;
  }

  get canAddAnswer(): boolean {
    if (this.optionListCtrl.disabled) return false;
    return this.optionListCtrl.length < 5;
  }

  ngOnInit(): void {
    this.questionForm.controls.type.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((type) => {
        if (type === QuestionTypes.CheckBoxList) {
          this.optionListCtrl.enable();
          this.allowOtherAnswerCtrl.enable();
        } else {
          this.optionListCtrl.disable();
          this.allowOtherAnswerCtrl.disable();
        }
      });
  }

  submitQuestion() {
    if (this.questionForm.valid) {
      this.activeModal.close(this.questionForm.value);
    }
  }

  addAnswerForCheckbox(): void {
    if (this.canAddAnswer) {
      this.optionListCtrl.push(this.fb.control(null, [Validators.required]));
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.unsubscribe();
  }
}
