import { AxiosInstance } from "axios";

export interface Candidature {
    status: string;
}
export interface Student {
  id: number;
  firstName: string;
  email: string;
  candidatures: Candidature[];
}

export const fetchStudents = async (
  axiosInstance: AxiosInstance,
  ulbranch: number,
  status: string,
  scholarship: string
): Promise<Student[]> => {
  try {
    const response = await axiosInstance.get("/students", {
      params: { ulbranch, status, scholarship },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

