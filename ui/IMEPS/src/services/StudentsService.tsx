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

export const fetchStudents = async (
    axiosInstance: AxiosInstance,
    ulBranch: string | null,
    status: string | null,
    scholarship: string | null
) => {
    try {
        // Create an object to hold the query parameters
        const queryParams: Record<string, string> = {};

        // Add non-null parameters to the queryParams object
        if (ulBranch) queryParams.ulbranch = ulBranch;
        if (status) queryParams.status = status;
        if (scholarship) queryParams.scholarship = scholarship;

        // Convert the queryParams object to a query string
        const queryString = new URLSearchParams(queryParams).toString();

        // Make the request with the query string (if any)
        const response = await axiosInstance.get(`/students${queryString ? `?${queryString}` : ""}`);
        console.log("Fetched students:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};