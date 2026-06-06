import { create } from "zustand";

interface QuestionType {
  type: string;
  questions: number;
  marks: number;
}

interface AssignmentStore {
  dueDate: string;
  instructions: string;

  questionTypes: QuestionType[];

  setDueDate: (date: string) => void;

  setInstructions: (text: string) => void;

  addQuestionType: () => void;

  removeQuestionType: (index: number) => void;

  updateQuestionType: (
    index: number,
    field: keyof QuestionType,
    value: string | number
  ) => void;
}

export const useAssignmentStore =
  create<AssignmentStore>((set) => ({
    dueDate: "",

    instructions: "",

    questionTypes: [
      {
        type: "MCQ",
        questions: 4,
        marks: 1,
      },
    ],

    setDueDate: (date) =>
      set({ dueDate: date }),

    setInstructions: (text) =>
      set({ instructions: text }),

    addQuestionType: () =>
  set((state) => ({
    questionTypes: [
      ...state.questionTypes,
      {
        type: "Multiple Choice Questions",
        questions: 1,
        marks: 1,
      },
    ],
  })),
    removeQuestionType: (index) =>
      set((state) => ({
        questionTypes:
          state.questionTypes.filter(
            (_, i) => i !== index
          ),
      })),

    updateQuestionType: (
      index,
      field,
      value
    ) =>
      set((state) => ({
        questionTypes:
          state.questionTypes.map((item, i) =>
            i === index
              ? {
                  ...item,
                  [field]: value,
                }
              : item
          ),
      })),
  }));