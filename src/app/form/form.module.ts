import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderComponent } from './builder/builder.component';
import { AnswersComponent } from './answers/answers.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddQuestionModalComponent } from './builder/add-question-modal/add-question-modal.component';
import { FormService } from './form.service';

export const routes: Route[] = [
  {
    path: 'builder',
    component: BuilderComponent,
  },
  {
    path: 'answers',
    component: AnswersComponent,
  },
];

@NgModule({
  declarations: [BuilderComponent, AnswersComponent, AddQuestionModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
  providers: [FormService],
})
export class FormModule {}
