import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";


const Scholarships = [
  { name: "Scholarship A", details: "Details about Scholarship A" },
  { name: "Scholarship B", details: "Details about Scholarship B" },
  { name: "Scholarship C", details: "Details about Scholarship C" },
  { name: "Scholarship A1", details: "Details about Scholarship A" },
  { name: "Scholarship B1", details: "Details about Scholarship B" },
  { name: "Scholarship C1", details: "Details about Scholarship C" },
  { name: "Scholarship A2", details: "Details about Scholarship A" },
  { name: "Scholarship B2", details: "Details about Scholarship B" },
  { name: "Scholarship C2", details: "Details about Scholarship C" },
  { name: "Scholarship A3", details: "Details about Scholarship A" },
  { name: "Scholarship B3", details: "Details about Scholarship B" },
  { name: "Scholarship C3", details: "Details about Scholarship C" },
  { name: "Scholarship A4", details: "Details about Scholarship A" },
  { name: "Scholarship B4", details: "Details about Scholarship B" },
  { name: "Scholarship C4", details: "Details about Scholarship C" },
];


const ScholarshipsPage: React.FC = () => {
 
  return (
      <Box p={5}>
      <Heading as="h1" mb={8} textAlign="center">
        Scholarships
      </Heading>
      <ul>
        {Scholarships.map((scholarships, index) => (
          <li key={index} style={{display: "inline-block", width: "50%"}}>
            <Box
              as="button"
              p={5}
              shadow="md" 
              borderWidth="1px"
              borderRadius="md"
              onClick={() => {
                const element = document.getElementById(`scholarship-${index}`);
                if (element) {
                  element.style.display = element.style.display === 'none' ? 'block' : 'none';
                }
              }}
              width="100%"
              mb={4}
              display="block"
              mr={2}
            >
              <SimpleGrid columns={1} spacing={4}>
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {scholarships.name}
                  </Text>
                </Box>
                <Box>
                  <Box 
                    id={`scholarship-${index}`} 
                    display="none"
                    mt={4}
                    maxHeight="200px"
                    overflowY="auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Close all scholarship details including current one
                      Scholarships.forEach((_, i) => {
                        const el = document.getElementById(`scholarship-${i}`);
                        if (el) {
                          el.style.display = 'none';
                        }
                      });
                      // Then show current one
                      const currentEl = document.getElementById(`scholarship-${index}`);
                      if (currentEl) {
                        currentEl.style.display = 'block';
                      }
                    }}
                  >
                    <Text fontSize="md" color="gray.600">
                      {scholarships.details}
                    </Text>
                  </Box>
                </Box>
              </SimpleGrid>
            </Box>
          </li>
        ))}
      </ul>
      </Box>
  );
};

export default ScholarshipsPage;
