import axios from "axios";

const API_URL =
  "http://localhost:5000/api/assignments";

export const createAssignment = async (
  data: any
) => {
  const response = await axios.post(
    API_URL,
    data
  );

  return response.data;
};

export const getAssignments =
  async () => {
    const response =
      await axios.get(API_URL);

    return response.data;
  };

export const getAssignmentById = async (
  id: string
) => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return response.data;
};

export const deleteAssignment = async (
  id: string
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};