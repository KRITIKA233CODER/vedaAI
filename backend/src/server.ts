import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongo";
import assignmentRoutes from "./routes/assignment.routes";
import aiRoutes from "./routes/ai.routes";

//dotenv.config();
//console.log(process.env.GEMINI_API_KEY);
console.log(
  "OpenRouter Key Loaded:",
  process.env.OPENROUTER_API_KEY?.substring(0, 15)
);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/assignments", assignmentRoutes);

app.get("/", (_req, res) => {
  res.send("VedaAI Backend Running");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
