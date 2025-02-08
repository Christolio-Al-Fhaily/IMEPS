import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Heading,
  Center,
} from "@chakra-ui/react";

const Admin: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "universities" | "scholarships" | "students"
  >("universities");
  const toast = useToast();

  // Mock data
  const universities = [
    { id: 1, name: "Harvard University", location: "USA" },
    { id: 2, name: "University of Oxford", location: "UK" },
  ];

  const scholarships = [
    { id: 1, name: "Fulbright Scholarship", amount: "$20,000" },
    { id: 2, name: "Chevening Scholarship", amount: "£18,000" },
  ];

  const students = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  // Get data based on selected category
  const getData = () => {
    switch (selectedCategory) {
      case "universities":
        return universities;
      case "scholarships":
        return scholarships;
      case "students":
        return students;
      default:
        return [];
    }
  };

  // Handle CRUD actions
  const handleCreate = () => {
    toast({
      title: "Create",
      description: `Create a new ${selectedCategory.slice(0, -1)}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleRead = () => {
    toast({
      title: "Read",
      description: `View details of selected ${selectedCategory.slice(0, -1)}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUpdate = () => {
    toast({
      title: "Update",
      description: `Update selected ${selectedCategory.slice(0, -1)}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete",
      description: `Delete selected ${selectedCategory.slice(0, -1)}`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle bottom buttons
  const handleExportToPowerBI = () => {
    toast({
      title: "Export to Power BI",
      description: "Data exported to Power BI",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Send Email",
      description: "Email sent successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleExportToPDF = () => {
    toast({
      title: "Export to PDF",
      description: "Data exported to PDF",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={8} textAlign="center">
        Admin Dashboard
      </Heading>

      {/* Category Buttons */}
      <Center mb={8}>
        <ButtonGroup spacing={4}>
          <Button
            colorScheme={selectedCategory === "universities" ? "teal" : "gray"}
            onClick={() => setSelectedCategory("universities")}
          >
            Universities
          </Button>
          <Button
            colorScheme={selectedCategory === "scholarships" ? "teal" : "gray"}
            onClick={() => setSelectedCategory("scholarships")}
          >
            Scholarships
          </Button>
          <Button
            colorScheme={selectedCategory === "students" ? "teal" : "gray"}
            onClick={() => setSelectedCategory("students")}
          >
            Students
          </Button>
        </ButtonGroup>
      </Center>

      {/* CRUD Buttons */}
      <Center mb={8}>
        <ButtonGroup spacing={4}>
          <Button colorScheme="blue" onClick={handleCreate}>
            Create
          </Button>
          <Button colorScheme="green" onClick={handleRead}>
            Read
          </Button>
          <Button colorScheme="orange" onClick={handleUpdate}>
            Update
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Center>

      {/* Table Viewer */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              {selectedCategory === "universities" && (
                <>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Location</Th>
                </>
              )}
              {selectedCategory === "scholarships" && (
                <>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                </>
              )}
              {selectedCategory === "students" && (
                <>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {getData().map((item) => (
              <Tr key={item.id}>
                {selectedCategory === "universities" && (
                  <>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.location}</Td>
                  </>
                )}
                {selectedCategory === "scholarships" && (
                  <>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.amount}</Td>
                  </>
                )}
                {selectedCategory === "students" && (
                  <>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Bottom Buttons */}
      <Center mt={8}>
        <ButtonGroup spacing={4}>
          <Button colorScheme="purple" onClick={handleExportToPowerBI}>
            Export to Power BI
          </Button>
          <Button colorScheme="teal" onClick={handleSendEmail}>
            Send Email
          </Button>
          <Button colorScheme="pink" onClick={handleExportToPDF}>
            Export to PDF
          </Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
};

export default Admin;