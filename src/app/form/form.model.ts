export enum QuestionTypes {
  Paragraph = 'Paragraph',
  CheckBoxList = 'CheckBoxList',
}

export interface Question {
  question: string;
  type: QuestionTypes;
  optionList?: string[];
  allowOtherAnswer?: boolean;
  required: boolean;
}
