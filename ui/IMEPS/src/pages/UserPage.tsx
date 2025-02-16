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
import { fetchUniversities } from "../services/universityService";

export default function StudentSubmissionForm() {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const axiosInstance = useAxiosAuth("admin", "password");

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const universityData = await fetchUniversities(axiosInstance);
        setUniversities(universityData);
      } catch (error) {
        toast({
          title: "Error fetching universities",
          description: "Unable to fetch universities. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, [axiosInstance, toast]);

  const universityPrograms = {
    "Harvard University": ["Computer Science", "Business Administration", "Medicine"],
    "MIT": ["Engineering", "Artificial Intelligence", "Physics"],
    "Stanford University": ["Law", "Data Science", "Biotechnology"],
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
              <Select placeholder="Select University" onChange={(e) => setSelectedUniversity(e.target.value)}>
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
              <Select placeholder="Select Program" onChange={(e) => setSelectedProgram(e.target.value)}>
                {universityPrograms[selectedUniversity]?.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                )) || <option disabled>No programs available</option>}
              </Select>
            </FormControl>

            {/* File Upload */}
            <FormControl>
              <FormLabel>Upload File (PDF)</FormLabel>
              <Input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
            </FormControl>

            {/* Submit Button */}
            <Button
              colorScheme="teal"
              width="full"
              isDisabled={!selectedUniversity || !selectedProgram || !file}
            >
              Submit
            </Button>
          </VStack>
        )}
      </Box>
    </Center>
  );
}
