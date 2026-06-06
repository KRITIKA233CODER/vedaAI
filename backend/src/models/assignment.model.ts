import mongoose from "mongoose";

const QuestionTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const AssignmentSchema = new mongoose.Schema(
  {
    dueDate: {
      type: Date,
      required: true,
    },

    instructions: {
      type: String,
      default: "",
    },

    questionTypes: [QuestionTypeSchema],

    totalQuestions: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "processing", "generated"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Assignment", AssignmentSchema);