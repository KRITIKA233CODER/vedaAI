"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAssignmentById } from "@/services/assignment.service";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, Loader2, Download } from "lucide-react";
import { jsPDF } from "jspdf";

interface QuestionType {
  type: string;
  count: number;
  marks: number;
}

interface Assignment {
  _id: string;
  instructions: string;
  dueDate: string;
  totalQuestions: number;
  totalMarks: number;
  paper: string;
  questionTypes: QuestionType[];
  status: string;
  createdAt: string;
}

export default function AssignmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAssignmentById(id);

        if (response.success) {
          setAssignment(response.assignment);
        } else {
          setError("Assignment not found");
        }
      } catch (err: any) {
        console.error("Error fetching assignment:", err);
        setError("Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAssignment();
    }
  }, [id]);

  const downloadPDF = () => {
    if (!assignment) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addWrappedText = (
      text: string,
      fontSize: number,
      fontStyle: "normal" | "bold" = "normal",
      spacing = 5
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", fontStyle);
      const lines = doc.splitTextToSize(text, contentWidth);
      
      lines.forEach((line: string) => {
        if (yPosition + fontSize > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += spacing;
      });
      
      yPosition += 3;
    };

    // Title
    const assignmentTitle =
  assignment.instructions.length > 40
    ? assignment.instructions.slice(0, 40) + "..."
    : assignment.instructions;
    
    addWrappedText(assignmentTitle, 18, "bold", 8);

    // Metadata Section
    addWrappedText("Assignment Details", 12, "bold", 6);
    
    const metadataLines = [
      `Due Date: ${new Date(assignment.dueDate).toLocaleDateString()}`,
      `Created: ${new Date(assignment.createdAt).toLocaleDateString()}`,
      `Total Questions: ${assignment.totalQuestions}`,
      `Total Marks: ${assignment.totalMarks}`,
      `Status: ${assignment.status}`,
    ];

    metadataLines.forEach((line) => {
      addWrappedText(line, 10, "normal", 5);
    });

    yPosition += 5;

    // Question Types Section
    if (assignment.questionTypes.length > 0) {
      addWrappedText("Question Types", 12, "bold", 6);
      
      assignment.questionTypes.forEach((qt) => {
        const qtLine = `${qt.type}: ${qt.count} questions × ${qt.marks} marks = ${qt.count * qt.marks} marks`;
        addWrappedText(qtLine, 10, "normal", 5);
      });

      yPosition += 5;
    }

    // Instructions Section
    if (assignment.instructions) {
      addWrappedText("Instructions", 12, "bold", 6);
      addWrappedText(assignment.instructions, 10, "normal", 5);
      yPosition += 5;
    }

    // Generated Paper Section
    if (assignment.paper) {
  const paperLines = assignment.paper.split("\n");

  doc.setFont("times", "normal");
  doc.setFontSize(11);

  paperLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(
      line,
      contentWidth
    );

    wrapped.forEach((textLine: string) => {
      if (
        yPosition >
        pageHeight - margin
      ) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(
        textLine,
        margin,
        yPosition
      );

      yPosition += 6;
    });
  });
}

    // Generate filename
    const filename = `${assignmentTitle.replace(/\s+/g, "-").toLowerCase()}.pdf`;
    
    // Download
    doc.save(filename);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "generated":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mt-6 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Assignments</span>
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 size={48} className="animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {error}
            </h2>
            <button
              onClick={() => router.back()}
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Go Back
            </button>
          </div>
        ) : assignment ? (
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {assignment.instructions.split(" ").slice(0, 6).join(" ") ||
                      "Assignment"}
                  </h1>
                  <p className="text-gray-600">
                    Created on{" "}
                    {new Date(
                      assignment.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {assignment.status}
                </span>
              </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Due Date Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Due Date
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>

              {/* Total Questions Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignment.totalQuestions}
                </p>
              </div>

              {/* Total Marks Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Marks
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignment.totalMarks}
                </p>
              </div>

              {/* Status Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Status
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {assignment.status}
                </span>
              </div>
            </div>

            {/* Question Types Section */}
            {assignment.questionTypes.length > 0 && (
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Question Types
                </h2>
                <div className="space-y-3">
                  {assignment.questionTypes.map(
                    (qt: QuestionType, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">
                            {qt.type}
                          </p>
                        </div>
                        <div className="flex gap-8">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Questions</p>
                            <p className="text-lg font-bold text-gray-900">
                              {qt.count}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              Marks Each
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {qt.marks}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              Total Marks
                            </p>
                            <p className="text-lg font-bold text-orange-500">
                              {qt.count * qt.marks}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Instructions Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Instructions
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {assignment.instructions}
              </p>
            </div>

            {/* Generated Paper Section */}
            {assignment.paper && (
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Generated Paper
                </h2>
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
                  {assignment.paper}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => router.back()}
                className="flex-1 border border-gray-300 text-gray-900 px-6 py-3 rounded-full hover:bg-gray-50 transition font-medium"
              >
                Back
              </button>
              <button
                onClick={downloadPDF}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-medium flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download PDF
              </button>
              {/*}
              <button
                onClick={() => router.push(`/assignments/${id}/edit`)}
                className="flex-1 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition font-medium"
              >
                Edit Assignment
              </button>
              */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
