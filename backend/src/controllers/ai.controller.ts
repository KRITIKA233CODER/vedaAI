import { Request, Response } from "express";
import { generateQuestionPaper }
from "../services/ai.service";

export const generatePaper =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const {
        instructions,
        totalQuestions,
        questionTypes = [],
      } = req.body;

      let questionTypeDetails = "";
      if (questionTypes.length > 0) {
        questionTypeDetails = "\n\nQuestion Types (MUST FOLLOW EXACTLY):\n";
        questionTypes.forEach((qt: any) => {
          questionTypeDetails += `- ${qt.type}: Generate exactly ${qt.count} questions worth ${qt.marks} mark(s) each\n`;
        });
      }

const prompt = `
Create a school examination paper.

Topic:
${instructions}

Total Questions:
${totalQuestions}
${questionTypeDetails}

Rules:
1. Generate exactly ${totalQuestions} questions.
${questionTypes.length > 0 ? "2. Follow the question type distribution EXACTLY as specified above." : "2. You can choose any question types."}
3. Plain text only.
4. No Markdown.
5. No ** symbols.
6. No LaTeX.
7. No dollar signs.
8. No explanations before the paper.
9. Start directly with the title.

Format:

CLASS:
SUBJECT:
TIME:
TOTAL MARKS:

Instructions:
1.
2.

Questions:
Q1.
Q2.
Q3.
...
`;
      const paper =
        await generateQuestionPaper(
          prompt
        );

      res.json({
        success: true,
        paper,
      });

    } catch (error: any) {
  console.error("Gemini Error:", error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
  };