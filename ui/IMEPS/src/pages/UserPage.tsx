import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Select,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { fetchUniversities, University } from "../services/universityService";
import { fetchPrograms, Program } from "../services/ProgramService";

export default function UserPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const axiosInstance = useAxiosAuth("admin", "password");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [universityData, programData] = await Promise.all([
          fetchUniversities(axiosInstance),
          fetchPrograms(axiosInstance), // Pass axiosInstance if needed
        ]);
        setUniversities(universityData);
        setPrograms(programData);
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Unable to fetch universities and programs. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [axiosInstance, toast]);

  // Filter programs based on selected university
  const filteredPrograms = programs.filter(
    (program) => program.university.name === selectedUniversity
  );

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedUniversity || !selectedProgram || !file) {
      toast({
        title: "Incomplete form",
        description: "Please fill out all fields and upload a file.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Create a FormData object for file upload
      const formData = new FormData();
      formData.append("university", selectedUniversity);
      formData.append("program", selectedProgram);
      formData.append("file", file);

      // Submit the form data to the server
      const response = await axiosInstance.post("/submit-application", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setSelectedUniversity("");
      setSelectedProgram("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Center minH="100vh" bg="gray.100">
      <Box bg="white" p={6} shadow="md" borderRadius="lg" w="full" maxW="400px">
        <Heading as="h2" size="lg" textAlign="center" mb={4}>
          Student Submission Form
        </Heading>

        {loading ? (
          <Center>
            <Spinner size="lg" />
          </Center>
        ) : (
          <VStack spacing={4}>
            {/* University Selection */}
            <FormControl>
              <FormLabel>University</FormLabel>
              <Select
                placeholder="Select University"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.name}>
                    {uni.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Program Selection */}
            <FormControl isDisabled={!selectedUniversity}>
              <FormLabel>Program</FormLabel>
              <Select
                placeholder="Select Program"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                isDisabled={filteredPrograms.length === 0}
              >
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program) => (
                    <option key={program.id} value={program.description}>
                      {program.description}
                    </option>
                  ))
                ) : (
                  <option disabled>No programs available</option>
                )}
              </Select>
            </FormControl>

            {/* File Upload */}
            <FormControl>
              <FormLabel>Upload File (PDF)</FormLabel>
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </FormControl>

            {/* Submit Button */}
            <Button
              colorScheme="teal"
              width="full"
              onClick={handleSubmit}
              isDisabled={!selectedUniversity || !selectedProgram || !file}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </VStack>
        )}
      </Box>
    </Center>
  );
}
