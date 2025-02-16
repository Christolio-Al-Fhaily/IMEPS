import React, { useEffect, useState } from "react";
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
  Select,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { fetchUniversities, University } from "../services/UniversityService.tsx";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { fetchStudents, Student } from "../services/StudentsService";
import {useNavigate} from "react-router-dom";

const AdminPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("universities");
  const [selectedArray, setSelectedArray] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterBranch, setFilterBranch] = useState<string>("All");
  const [filterScholarship, setFilterScholarship] = useState<string>("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // const [newItem, setNewItem] = useState({});
  const toast = useToast();
  const navigate = useNavigate();


  // // Mock data
  // const [universities, setUniversities] = useState([
  //   { id: 1, name: "Harvard University", location: "USA" },
  //   { id: 2, name: "University of Oxford", location: "UK" },
  // ]);

  const [scholarships, setScholarships] = useState([
    { id: 1, name: "Fulbright Scholarship", amount: "$20,000", students: [] },
    { id: 2, name: "Chevening Scholarship", amount: "£18,000", students: [] },
  ]);

  // const [students, setStudents] = useState([
  //   { id: 1, name: "John Doe", email: "john@example.com", status: "Accepted", branch: "1", scholarshipId: null },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Waitlisted", branch: "2", scholarshipId: null },
  //   { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Not Accepted", branch: "3", scholarshipId: 1 },
  // ]);

  // Get data based on selected category
  let universities: University[] = [];
  // let scholarships: Scholarship[] = [];
  let students: Student[] = [];
  const axiosInstance = useAxiosAuth("admin", "password");
  const getData = async () => {
    switch (selectedCategory) {
      case "universities":
        universities = await fetchUniversities(axiosInstance);
        setSelectedArray([...universities]);
        break;
      case "scholarships":
        // scholarships = await fetchScholarships(axiosInstance);
        setSelectedArray([...scholarships]);
        break;
      case "students":
        students = await fetchStudents(axiosInstance);
        console.log(students)
        setSelectedArray([...students]);
        break;
    }
  };

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  // Handle Create
  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  // Handle Update
  const handleUpdate = () => {
    if (!selectedItem) {
      toast({
        title: "No item selected",
        description: "Please select an item to update.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setIsUpdateModalOpen(true);
  };

  // Handle Delete
  const handleDelete = () => {
    if (!selectedItem) {
      toast({
        title: "No item selected",
        description: "Please select an item to delete.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      //TODO delete api call
      return;
    }
    switch (selectedCategory) {
      case "universities":
        break;
      case "scholarships":
        break;
      case "students":
        break;
    }
    setSelectedItem(null);
    toast({
      title: "Deleted",
      description: `${selectedCategory.slice(0, -1)} deleted successfully`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle adding new item
  const handleAddItem = () => {
    //TODO refresh
    setIsCreateModalOpen(false);
    toast({
      title: "Success",
      description: `New ${selectedCategory.slice(0, -1)} added`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle updating an item
  // const handleUpdateItem = () => {
  //   switch (selectedCategory) {
  //     case "universities":
  //       setUniversities(
  //         universities.map((uni) =>
  //           uni.id === selectedItem.id ? { ...uni, ...newItem } : uni
  //         )
  //       );
  //       break;
  //     case "scholarships":
  //       setScholarships(
  //         scholarships.map((scholarship) =>
  //           scholarship.id === selectedItem.id ? { ...scholarship, ...newItem } : scholarship
  //         )
  //       );
  //       break;
  //     case "students":
  //       setStudents(
  //         students.map((student) =>
  //           student.id === selectedItem.id ? { ...student, ...newItem } : student
  //         )
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  //   setIsUpdateModalOpen(false);
  //   setSelectedItem(null);
  //   setNewItem({});
  //   toast({
  //     title: "Updated",
  //     description: `${selectedCategory.slice(0, -1)} updated successfully`,
  //     status: "success",
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // };

  // Handle refresh
  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: `Student list refreshed`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle row click
  const handleRowClick = (item: any) => {
    setSelectedItem(item);
  };

  // Handle PDF generation
  const handleGeneratePDF = () => {
    toast({
      title: "PDF Generated",
      description: `PDF generated for selected data`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle Power BI integration
  const handlePowerBI = () => {
    toast({
      title: "Power BI",
      description: `Power BI integration not implemented yet`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle sending emails
  const handleSendEmails = () => {
    if (selectedCategory !== "students") {
      toast({
        title: "Error",
        description: `Emails can only be sent to students`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Emails Sent",
      description: `Emails sent to selected students`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Replace the existing headers logic with this:
  const getHeaders = (array: any[]) => {
    if (array.length === 0) return [];
    const allHeaders = Object.keys(array[0]);
    const ignoredHeaders = ['convention', 'logoUrl', 'candidatures', 'id', 'students'];
    return allHeaders.filter((h: string) => !ignoredHeaders.includes(h));
  };

  // Update the headers constant to use the new function:
  const handleCategoryChange = (category: string, data: any[]) => {
    setSelectedCategory(category);
    setSelectedArray([...data]); // Create a new reference
    setSelectedItem(null); // Clear selected row
  };
  const headers = getHeaders(selectedArray);

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
            onClick={() => handleCategoryChange("universities", universities)}
          >
            Universities
          </Button>
          <Button
            colorScheme={selectedCategory === "scholarships" ? "teal" : "gray"}
            onClick={() => handleCategoryChange("scholarships", scholarships)}
          >
            Scholarships
          </Button>
          <Button
            colorScheme={selectedCategory === "students" ? "teal" : "gray"}
            onClick={() => handleCategoryChange("students", students)}
          >
            Students
          </Button>
        </ButtonGroup>
      </Center>

      {/* CRUD Buttons and Filters */}
      <Center mb={8}>
        <ButtonGroup spacing={4}>
          <Button colorScheme="blue" onClick={handleCreate}>
            Create
          </Button>
          <Button colorScheme="orange" onClick={handleUpdate}>
            Update
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
          {selectedCategory === "students" && (
            <>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "All" | "Accepted" | "Not Accepted" | "Waitlisted")}
              >
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Not Accepted">Not Accepted</option>
                <option value="Waitlisted">Waitlisted</option>
              </Select>
              <Select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value as "All" | "1" | "2" | "3")}
              >
                <option value="All">All Branches</option>
                <option value="1">Branch 1</option>
                <option value="2">Branch 2</option>
                <option value="3">Branch 3</option>
              </Select>
              <IconButton
                aria-label="Refresh"
                icon={<RepeatIcon />}
                onClick={handleRefresh}
              />
            </>
          )}
        </ButtonGroup>
      </Center>

      {/* Additional Buttons */}
      <Center mb={8}>
        <ButtonGroup spacing={4}>
          <Button colorScheme="purple" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
          <Button colorScheme="pink" onClick={handlePowerBI}>
            Power BI
          </Button>
          {selectedCategory === "students" && (
            <Button colorScheme="green" onClick={handleSendEmails}>
              Send Emails
            </Button>
          )}
        </ButtonGroup>
      </Center>

      {/* Table Viewer */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              {headers.map((header) => (
                <Th key={header}>{header}</Th>
              )
              )}
            </Tr>
          </Thead>
          <Tbody>
            {selectedArray.map((item, index) => {
              console.log("selected array", selectedArray)
              return (
                <Tr
                  key={index}
                  bg={selectedItem === item ? "teal.50" : "transparent"}
                  onClick={() => handleRowClick(item)}
                  cursor="pointer">
                  {headers.map((header) => {
                    if (header === "country") {
                      return (
                        <Td key={header}>{item[header].name}</Td>
                      )
                    }
                    else if (header === "convention") {
                      return (
                        <Td key={header}>{item[header].name}</Td>
                      )
                    }
                    else {
                      return (
                        <Td key={header}>{item[header]}</Td>
                      )
                    }
                  }
                  )}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>

      {/* Create Modal */}
      {/* <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New {selectedCategory.slice(0, -1)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCategory === "universities" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="University Name"
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Location</FormLabel>
                  <Input
                    placeholder="Location"
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  />
                </FormControl>
              </>
            )}
            {selectedCategory === "scholarships" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Scholarship Name"
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Amount"
                    onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                  />
                </FormControl>
              </>
            )}
            {selectedCategory === "students" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Student Name"
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Select status"
                    onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Not Accepted">Not Accepted</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    placeholder="Select branch"
                    onChange={(e) => setNewItem({ ...newItem, branch: e.target.value })}
                  >
                    <option value="1">Branch 1</option>
                    <option value="2">Branch 2</option>
                    <option value="3">Branch 3</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Scholarship</FormLabel>
                  <Select
                    placeholder="Select scholarship"
                    onChange={(e) => setNewItem({ ...newItem, scholarshipId: parseInt(e.target.value) })}
                  >
                    <option value="">None</option>
                    {scholarships.map((scholarship) => (
                      <option key={scholarship.id} value={scholarship.id}>
                        {scholarship.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddItem}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      {/* Update Modal */}
      {/* <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update {selectedCategory.slice(0, -1)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCategory === "universities" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="University Name"
                    defaultValue={selectedItem?.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Location</FormLabel>
                  <Input
                    placeholder="Location"
                    defaultValue={selectedItem?.location}
                    onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                  />
                </FormControl>
              </>
            )}
            {selectedCategory === "scholarships" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Scholarship Name"
                    defaultValue={selectedItem?.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Amount"
                    defaultValue={selectedItem?.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                  />
                </FormControl>
              </>
            )}
            {selectedCategory === "students" && (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Student Name"
                    defaultValue={selectedItem?.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    defaultValue={selectedItem?.email}
                    onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    placeholder="Select status"
                    defaultValue={selectedItem?.status}
                    onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Not Accepted">Not Accepted</option>
                    <option value="Waitlisted">Waitlisted</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Branch</FormLabel>
                  <Select
                    placeholder="Select branch"
                    defaultValue={selectedItem?.branch}
                    onChange={(e) => setNewItem({ ...newItem, branch: e.target.value })}
                  >
                    <option value="1">Branch 1</option>
                    <option value="2">Branch 2</option>
                    <option value="3">Branch 3</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Scholarship</FormLabel>
                  <Select
                    placeholder="Select scholarship"
                    defaultValue={selectedItem?.scholarshipId}
                    onChange={(e) => setNewItem({ ...newItem, scholarshipId: parseInt(e.target.value) })}
                  >
                    <option value="">None</option>
                    {scholarships.map((scholarship) => (
                      <option key={scholarship.id} value={scholarship.id}>
                        {scholarship.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateItem}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default AdminPage;