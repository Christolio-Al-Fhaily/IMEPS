import axios from "../hooks/useAxiosAuth";
import { University } from "../services/universityService";
// Define types for API responses
  
export interface Program {
    id: number;
    description: string;
    university: University;
  }
// const axiosInstance = axios("admin", "password");

export const fetchPrograms = async () => {
  try {
    const response = await axiosInstance.get("/programs");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching programs");
  }
};

export const createProgram = async (programName: string) => {
  try {
    await axiosInstance.post("/programs", { name: programName });
  } catch (error) {
    throw new Error("Error creating program");
  }
};

export const deleteProgram = async (programId: number) => {
  try {
    await axiosInstance.delete(`/programs/${programId}`);
  } catch (error) {
    throw new Error("Error deleting program");
  }
};
