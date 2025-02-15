import { AxiosInstance } from "axios";


//TODO move to appropriate service

// import { University } from "./universityService";

// export interface Program {
//     id: number;
//     description: string;
//     department: string;
//     type: string; // e.g., Masters, PhD, etc.
//     submissionDueDate: string; // ISO format (YYYY-MM-DD)
//     academicYear: string;
//     university: University;
//   }
  
//   export interface Candidature {
//     program: Program;
//     status: string; // e.g., "pending", "approved", "rejected"
//   }

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    stdId: number;
    academicYear: number;
    department: string;
    grade: number;
    ulBranch: number;
    // candidatures: Candidature[];
  }

export const fetchStudents = async (axiosInstance: AxiosInstance) => {
    try {
      const response = await axiosInstance.get("/students");
      console.log("Fetched students:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  };