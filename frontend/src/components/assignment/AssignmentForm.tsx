"use client";

import FileUpload from "./FileUpload";
import { useAssignmentStore } from "@/store/assignmentStore";
import { createAssignment } from "@/services/assignment.service";
import { useState } from "react";
import { generatePaper } from "@/services/ai.service";
import { Loader2 } from "lucide-react";

interface ValidationErrors {
  dueDate?: string;
  instructions?: string;
  questionTypes?: string;
}

export default function AssignmentForm() {
  const [loading, setLoading] =
  useState(false);
  const [generateLoading, setGenerateLoading] = useState(false);
  const [paper, setPaper] =
  useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const {
    dueDate,
    setDueDate,

    instructions,
    setInstructions,

    questionTypes,
    addQuestionType,
    removeQuestionType,
    updateQuestionType,
  } = useAssignmentStore();

  const totalQuestions = questionTypes.reduce(
    (sum, item) => sum + item.questions,
    0
  );
  

  const totalMarks = questionTypes.reduce(
    (sum, item) => sum + item.questions * item.marks,
    0
  );

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!dueDate.trim()) {
      newErrors.dueDate = "Due Date is required";
    }

    if (!instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    }

    if (questionTypes.length === 0 || questionTypes.every(q => q.type.trim() === "")) {
      newErrors.questionTypes = "At least one question type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
  try {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
  dueDate,
  instructions,
  paper, // ADD THIS
  questionTypes: questionTypes
    .filter((q) => q.type.trim() !== "")
    .map((q) => ({
      type: q.type,
      count: q.questions,
      marks: q.marks,
    })),
  totalQuestions,
  totalMarks,
};
    

console.log("PAPER:", paper);
console.log(payload);

    const response =
      await createAssignment(
        payload
      );

    console.log(response);

    alert(
      "Assignment Created Successfully"
    );
    setPaper("");
    setInstructions("");
    setDueDate("");
    setErrors({});
  } catch (error) {
    console.error(error);

    alert(
      "Failed to create assignment"
    );
  } finally {
    setLoading(false);
  }
};

const handleGenerate = async () => {
  try {
    if (!instructions.trim()) {
      setErrors({ ...errors, instructions: "Instructions are required" });
      return;
    }

    if (questionTypes.length === 0 || questionTypes.every(q => q.type.trim() === "")) {
      setErrors({ ...errors, questionTypes: "At least one question type is required" });
      return;
    }

    setGenerateLoading(true);

    const filteredQuestionTypes = questionTypes
      .filter((q) => q.type.trim() !== "")
      .map((q) => ({
        type: q.type,
        count: q.questions,
        marks: q.marks,
      }));

    const result =
      await generatePaper(
        instructions,
        totalQuestions,
        filteredQuestionTypes
      );

    setPaper(result.paper);

  } catch (error) {
    console.error(error);
    alert("Failed to generate paper");
  } finally {
    setGenerateLoading(false);
  }
};



  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2">
        Assignment Details
      </h2>

      <p className="text-gray-500 mb-8">
        Basic information about your assignment
      </p>

      {/* File Upload */}
      <FileUpload />

      {/* Due Date */}
      <div className="mt-8">
        <label className="block font-semibold mb-2">
          Due Date <span className="text-red-500">*</span>
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            if (e.target.value.trim()) {
              setErrors({ ...errors, dueDate: undefined });
            }
          }}
          className="
            w-full
            border
            rounded-xl
            p-3
            outline-none
            focus:border-blue-500
          "
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm mt-2">{errors.dueDate}</p>
        )}
      </div>

      {/* Question Types */}
      <div className="mt-8">
        <label className="block font-semibold mb-4">
          Question Types <span className="text-red-500">*</span>
        </label>

        {questionTypes.map((item, index) => (
          <div
            key={index}
            className="
              grid
              md:grid-cols-5
              gap-4
              mb-4
              items-end
            "
          >
            {/* Type */}
            <div>
              <label className="text-xs text-gray-600 font-medium">Type</label>
              <select
                value={item.type}
                onChange={(e) =>
                  updateQuestionType(
                    index,
                    "type",
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  text-sm
                "
              >
                <option value="">Select Type</option>
                <option>
                  MCQ
                </option>

                <option>
                  Short Questions
                </option>

                <option>
                  Diagram Questions
                </option>

                <option>
                  Numerical Problems
                </option>
              </select>
            </div>

            {/* Questions */}
            <div>
              <label className="text-xs text-gray-600 font-medium">No. of Questions</label>
              <div className="flex items-center gap-3 border rounded-xl p-2">

                <button
                  onClick={() =>
                    updateQuestionType(
                      index,
                      "questions",
                      Math.max(
                        1,
                        item.questions - 1
                      )
                    )
                  }
                  className="px-2 py-1 hover:bg-gray-200 rounded"
                >
                  −
                </button>

                <span className="flex-1 text-center font-medium">
                  {item.questions}
                </span>

                <button
                  onClick={() =>
                    updateQuestionType(
                      index,
                      "questions",
                      item.questions + 1
                    )
                  }
                  className="px-2 py-1 hover:bg-gray-200 rounded"
                >
                  +
                </button>

              </div>
            </div>

            {/* Marks */}
            <div>
              <label className="text-xs text-gray-600 font-medium">Marks</label>
              <input
                type="number"
                min={1}
                value={item.marks}
                onChange={(e) =>
                  updateQuestionType(
                    index,
                    "marks",
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  border
                  rounded-xl
                  p-3
                  text-sm
                "
              />
            </div>

            {/* Remove */}
            <button
              onClick={() =>
                removeQuestionType(index)
              }
              className="
                bg-red-500
                text-white
                rounded-xl
                px-4
                py-3
                hover:bg-red-600
                transition
                text-sm
              "
            >
              Remove
            </button>
          </div>
        ))}

        {errors.questionTypes && (
          <p className="text-red-500 text-sm mt-2">{errors.questionTypes}</p>
        )}

        {/* Add Button */}
        <button
          onClick={addQuestionType}
          className="
            mt-4
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-800
            transition
            text-sm
          "
        >
          + Add Question Type
        </button>
      </div>

      {/* Assignment Summary Card */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Assignment Summary</h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Total Questions:</strong> {totalQuestions}
          </p>
          <p className="text-gray-700">
            <strong>Total Marks:</strong> {totalMarks}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8">
        <label className="block font-semibold mb-2">
          Additional Information <span className="text-red-500">*</span>
        </label>

        <textarea
          rows={5}
          placeholder="Generate a question paper for 3 hour exam..."
          value={instructions}
          onChange={(e) => {
            setInstructions(
              e.target.value
            );
            if (e.target.value.trim()) {
              setErrors({ ...errors, instructions: undefined });
            }
          }}
          className="
            w-full
            border
            rounded-xl
            p-4
            outline-none
            focus:border-blue-500
            resize-none
          "
        />

        {errors.instructions && (
          <p className="text-red-500 text-sm mt-2">{errors.instructions}</p>
        )}

        {/* Examples */}
        <div className="mt-3 text-sm text-gray-500">
          <p className="font-medium mb-2">Examples:</p>
          <ul className="space-y-1">
            <li>• Generate a Class 8 Algebra test</li>
            <li>• Create a Physics paper on Electricity</li>
            <li>• Generate MCQs on Plant Biology</li>
          </ul>
        </div>
      </div>

      {/* Generate Paper Button */}
      <button
        onClick={handleGenerate}
        disabled={generateLoading}
        className="
          bg-green-600
          text-white
          px-6
          py-3
          rounded-xl
          mt-6
          hover:bg-green-700
          transition
          disabled:opacity-60
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {generateLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Paper"
        )}
      </button>

      {/* Paper Preview - A4 Style */}
      {paper && (
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Paper Preview</h3>
          <div
            className="
              bg-white
              border
              border-gray-300
              rounded-lg
              shadow-md
              p-8
              max-h-96
              overflow-y-auto
              whitespace-pre-wrap
              font-serif
              text-sm
              leading-relaxed
            "
            style={{
              fontFamily: "Georgia, serif",
              backgroundColor: "#ffffff",
              minHeight: "400px",
            }}
          >
            {paper}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          className="
            border
            px-6
            py-3
            rounded-full
            hover:bg-gray-50
            transition
          "
        >
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-full
            hover:bg-gray-800
            transition
            disabled:opacity-60
            disabled:cursor-not-allowed
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {
            loading
              ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              )
              : "Create Assignment"
          }
        </button>
      </div>
    </div>
  );
}
