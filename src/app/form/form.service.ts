import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { selectAtLeastOneValidator } from './at-least-one.validator';
import { Question, QuestionTypes } from './form.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  readonly questionList: Question[] = [];
  readonly answerList = this.fb.array([]);

  constructor(private readonly fb: FormBuilder) {}

  addNewQuestion(quest: Question) {
    this.questionList.push(quest);

    if (quest.type === QuestionTypes.Paragraph) {
      this.answerList.push(
        this.fb.control(null, quest.required ? [Validators.required] : [])
      );
    }

    if (quest.type === QuestionTypes.CheckBoxList) {
      const checkboxListForm =
        quest.optionList
          ?.map((option) => {
            return {
              [option]: this.fb.control(false),
            };
          })
          .reduce((a, b) => ({ ...a, ...b })) || {};
      if (quest.allowOtherAnswer) {
        checkboxListForm['other'] = this.fb.control(false);
        checkboxListForm['otherAnswer'] = this.fb.control(
          { disabled: true, value: null },
          [Validators.required]
        );
        checkboxListForm['other'].valueChanges
          .pipe(distinctUntilChanged())
          .subscribe((otherSelected) => {
            if (otherSelected) {
              checkboxListForm['otherAnswer'].enable();
            } else {
              checkboxListForm['otherAnswer'].disable();
            }
          });
      }

      const form = this.fb.group(checkboxListForm);
      form.setValidators(quest.required ? [selectAtLeastOneValidator()] : []);
      this.answerList.push(form as unknown as FormControl);
    }
  }
}
