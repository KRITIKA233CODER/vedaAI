export interface QuestionType {
  type: string;
  questions: number;
  marks: number;
}

export interface AssignmentFormData {
  dueDate: string;
  instructions: string;
  questionTypes: QuestionType[];
}