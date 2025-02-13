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

const Admin: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "universities" | "scholarships" | "students"
  >("universities");
  const [filterStatus, setFilterStatus] = useState<"All" | "Accepted" | "Not Accepted" | "Waitlisted">("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({});
  const toast = useToast();

  // Mock data
  const [universities, setUniversities] = useState([
    { id: 1, name: "Harvard University", location: "USA" },
    { id: 2, name: "University of Oxford", location: "UK" },
  ]);

  const [scholarships, setScholarships] = useState([
    { id: 1, name: "Fulbright Scholarship", amount: "$20,000" },
    { id: 2, name: "Chevening Scholarship", amount: "£18,000" },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Accepted" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Waitlisted" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "Not Accepted" },
  ]);

  // Get data based on selected category
  const getData = () => {
    switch (selectedCategory) {
      case "universities":
        return universities;
      case "scholarships":
        return scholarships;
      case "students":
        return filterStatus === "All"
          ? students
          : students.filter((student) => student.status === filterStatus);
      default:
        return [];
    }
  };

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
      return;
    }
    switch (selectedCategory) {
      case "universities":
        setUniversities(universities.filter((uni) => uni.id !== selectedItem.id));
        break;
      case "scholarships":
        setScholarships(scholarships.filter((scholarship) => scholarship.id !== selectedItem.id));
        break;
      case "students":
        setStudents(students.filter((student) => student.id !== selectedItem.id));
        break;
      default:
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
    switch (selectedCategory) {
      case "universities":
        setUniversities([...universities, { id: universities.length + 1, ...newItem }]);
        break;
      case "scholarships":
        setScholarships([...scholarships, { id: scholarships.length + 1, ...newItem }]);
        break;
      case "students":
        setStudents([...students, { id: students.length + 1, ...newItem }]);
        break;
      default:
        break;
    }
    setIsCreateModalOpen(false);
    setNewItem({});
    toast({
      title: "Success",
      description: `New ${selectedCategory.slice(0, -1)} added`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Handle updating an item
  const handleUpdateItem = () => {
    switch (selectedCategory) {
      case "universities":
        setUniversities(
          universities.map((uni) =>
            uni.id === selectedItem.id ? { ...uni, ...newItem } : uni
          )
        );
        break;
      case "scholarships":
        setScholarships(
          scholarships.map((scholarship) =>
            scholarship.id === selectedItem.id ? { ...scholarship, ...newItem } : scholarship
          )
        );
        break;
      case "students":
        setStudents(
          students.map((student) =>
            student.id === selectedItem.id ? { ...student, ...newItem } : student
          )
        );
        break;
      default:
        break;
    }
    setIsUpdateModalOpen(false);
    setSelectedItem(null);
    setNewItem({});
    toast({
      title: "Updated",
      description: `${selectedCategory.slice(0, -1)} updated successfully`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

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

      {/* CRUD Buttons and Filter */}
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
              <IconButton
                aria-label="Refresh"
                icon={<RepeatIcon />}
                onClick={handleRefresh}
              />
            </>
          )}
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
                  <Th>Status</Th>
                </>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {getData().map((item) => (
              <Tr
                key={item.id}
                bg={selectedItem?.id === item.id ? "teal.50" : "transparent"}
                onClick={() => handleRowClick(item)}
                cursor="pointer"
              >
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
                    <Td>{item.status}</Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Create Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
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
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddItem}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Update Modal */}
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
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
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateItem}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Admin;