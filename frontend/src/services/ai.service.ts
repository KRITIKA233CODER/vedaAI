import axios from "axios";

interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

const API_URL =
  "http://localhost:5000/api/ai/generate";

export const generatePaper =
  async (
    instructions: string,
    totalQuestions: number,
    questionTypes: QuestionType[] = []
  ) => {
    const response =
      await axios.post(
        API_URL,
        {
          instructions,
          totalQuestions,
          questionTypes,
        }
      );

    return response.data;
  };