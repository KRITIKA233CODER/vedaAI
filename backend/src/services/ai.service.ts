import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const generateQuestionPaper = async (
  prompt: string
) => {
  try {
    const response =
      await client.chat.completions.create({
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    console.log(
      JSON.stringify(response, null, 2)
    );

    if (
      !response ||
      !response.choices ||
      response.choices.length === 0
    ) {
      throw new Error(
        "No choices returned from OpenRouter"
      );
    }

    return (
      response.choices[0].message.content ||
      "No response generated"
    );

  } catch (error) {
    console.error(
      "OPENROUTER ERROR:",
      error
    );
    throw error;
  }
};