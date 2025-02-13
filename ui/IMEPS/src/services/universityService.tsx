import { Toast } from "@chakra-ui/react";
import useAxiosAuth from "../hooks/useAxiosAuth"; // Import the hook

// Fetch countries from the backend
export const fetchCountries = async (username: string, password: string) => {
  const axiosInstance = useAxiosAuth(username, password); // Create authenticated Axios instance

  try {
    const response = await axiosInstance.get("/api/countries");
    console.log("Fetched countries:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error); // Debugging
    Toast({
      title: "Error",
      description: "Failed to fetch countries",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return [];
  }
};

// Fetch universities from the backend
export const fetchUniversities = async (username: string, password: string) => {
  const axiosInstance = useAxiosAuth(username, password); // Create authenticated Axios instance

  try {
    const response = await axiosInstance.get("/api/universities");
    console.log("Fetched universities:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error); // Debugging
    Toast({
      title: "Error",
      description: "Failed to fetch universities",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return [];
  }
};

// Fetch logo from Wikipedia
export const fetchLogoFromWikipedia = async (universityName: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        universityName
      )}&prop=pageimages&format=json&pithumbsize=100&origin=*`
    );
    const data = await response.json();
    const page = Object.values(data.query.pages)[0] as any;
    return page.thumbnail?.source || null;
  } catch (error) {
    console.error("Failed to fetch logo from Wikipedia:", error); // Debugging
    return null;
  }
};

// Fetch logos for universities
export const fetchLogosForUniversities = async (universities: University[]) => {
  try {
    const updatedUniversities = await Promise.all(
      universities.map(async (uni) => {
        const logoUrl = await fetchLogoFromWikipedia(uni.name);
        return { ...uni, logoUrl };
      })
    );
    console.log("Updated universities with logos:", updatedUniversities); // Debugging
    return updatedUniversities;
  } catch (error) {
    console.error("Error fetching logos for universities:", error); // Debugging
    return universities; // Return the original list if logo fetching fails
  }
};