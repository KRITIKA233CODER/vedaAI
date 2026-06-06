import { Request, Response } from "express";
import Assignment from "../models/assignment.model";

export const createAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      success: true,
      assignment,
    });
  } catch (error: any) {
  console.error("CREATE ASSIGNMENT ERROR");

  console.error(error);

  if (error.errors) {
    Object.keys(error.errors).forEach((key) => {
      console.log(
        key,
        error.errors[key].message
      );
    });
  }

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

export const getAssignments = async (
  req: Request,
  res: Response
) => {
  try {
    const assignments = await Assignment.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getAssignmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.json({
      success: true,
      assignment,
    });
  } catch (error: any) {
    console.error("GET ASSIGNMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.json({
      success: true,
      message: "Assignment deleted successfully",
      assignment,
    });
  } catch (error: any) {
    console.error("DELETE ASSIGNMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};