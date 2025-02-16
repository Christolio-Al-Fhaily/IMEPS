import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import {RepeatIcon} from "@chakra-ui/icons";
import {fetchUniversities, University} from "../services/UniversityService.tsx";
import useAxiosAuth from "../hooks/useAxiosAuth";
import {fetchStudents, Student} from "../services/StudentsService";
import {useNavigate} from "react-router-dom";
import {useUser} from "../services/UserServices.tsx";
import {fetchScholarships, Scholarship} from "../services/ScholarshipService.tsx";
import {fetchCSV, fetchPDF} from "../services/FileService.tsx";

const AdminPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("universities");
    const [selectedArray, setSelectedArray] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filterBranch, setFilterBranch] = useState<string>("");
    const [filterScholarship, setFilterScholarship] = useState<string>("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [universities, setUniversities] = useState<University[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [newItem, setNewItem] = useState({});
    const toast = useToast();
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const [scholarships, setScholarships] = useState([]);

    // Get data based on selected category
    const axiosInstance = useAxiosAuth(user!.username, user!.password);
    const getData = async () => {
        switch (selectedCategory) {
            case "universities":
                setUniversities(await fetchUniversities(axiosInstance));
                setSelectedArray([...universities]);
                break;
            case "scholarships":
                setScholarships(await fetchScholarships(axiosInstance));
                setSelectedArray([...scholarships]);
                break;
            case "students":
                setStudents(await fetchStudents(axiosInstance, filterBranch, filterStatus, filterScholarship));
                setSelectedArray([...students]);
                break;
        }
    };

    useEffect(() => {
        getData();
    }, [selectedCategory, isUpdateModalOpen, isCreateModalOpen, filterScholarship, filterBranch, filterStatus]);

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
        switch (selectedCategory) {
            case "universities":
                setUniversities((prev: University[]) => [...prev, newItem as University]);

                break;
            case "scholarships":
                setScholarships((prev: Scholarship[]) => [...prev, newItem as Scholarship]
                );
                break;
            case "students":
                setStudents((prev: Student[]) => [...prev, newItem as Student]);
                break;
            default:
                break;
        }
        setIsCreateModalOpen(false);
        setSelectedItem(null);
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
                        uni.id === selectedItem.id ? {...uni, ...newItem} : uni
                    )
                );
                break;
            case "scholarships":
                setScholarships(
                    scholarships.map((scholarship) =>
                        scholarship.id === selectedItem.id ? {...scholarship, ...newItem} : scholarship
                    )
                );
                break;
            case "students":
                setStudents(
                    students.map((student) =>
                        student.id === selectedItem.id ? {...student, ...newItem} : student
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
        setSelectedCategory(selectedCategory)
        setSelectedArray([...selectedArray]); // Create a new reference
        setSelectedItem(null); // Clear selected row
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

        const rows = selectedArray.map((item) => {
            return headers.map(h => {
                if (selectedCategory === "universities" && h === "country")
                    return item['country'].name
                return item[h];
            });
        });
        console.log("rows:", rows)
        fetchPDF(axiosInstance, {headers: headers, rows: rows, title: selectedCategory.toUpperCase()})
        toast({
            title: "PDF Generated",
            description: `PDF generated for selected data`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };
    const handleGenerateCSV = () => {

        const rows = selectedArray.map((item) => {
            return headers.map(h => {
                if (selectedCategory === "universities" && h === "country")
                    return item['country'].name
                return item[h];
            });
        });
        console.log("rows:", rows)
        fetchCSV(axiosInstance, {headers: headers, rows: rows, title: selectedCategory.toUpperCase()})
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
        if(selectedItem == null){
            toast({
                title: "No student selected",
                description: "Please select a student",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            return;
        }

        const recipient = selectedItem["email"];
        const subject = "Mobility Update";
        const body = "This is a test email sent from the IMEPS application.";

        // Construct the mailto URL
        // Open the default email client
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


        toast({
            title: "Emails Sent",
            description: `Emails sent to selected students`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    // Replace the existing headers logic with this:
    const getHeaders = (array: any[]) => array.length ? Object.keys(array[0]).filter(h => !['convention', 'logoUrl', 'candidatures', 'id', 'students'].includes(h)) : [];


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
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Not Accepted</option>
                                <option value="pending">Waitlisted</option>
                            </Select>
                            <Select
                                value={filterBranch}
                                onChange={(e) => setFilterBranch(e.target.value)}
                            >
                                <option value="">All Branches</option>
                                <option value="1">Branch 1</option>
                                <option value="2">Branch 2</option>
                                <option value="3">Branch 3</option>
                            </Select>
                            <IconButton
                                aria-label="Refresh"
                                icon={<RepeatIcon/>}
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
                    <Button colorScheme="yellow" onClick={handleGenerateCSV}>
                        Generate CSV
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
            <Box overflowX="auto" overflowY="auto" maxHeight={1000}>
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
                                            } else if (header === "convention") {
                                                return (
                                                    <Td key={header}>{item[header].name}</Td>
                                                )
                                            } else {
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
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add New {selectedCategory.slice(0, -1)}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {headers.map(header => (
                            <React.Fragment key={header}>
                                <FormControl mt={4}>
                                    <FormLabel>{header}</FormLabel>
                                    <Input
                                        placeholder={header}
                                        onChange={(e) => {
                                            setNewItem({
                                                ...newItem,
                                                [header]: typeof selectedItem?.[header] === "object" && selectedItem[header] !== null
                                                    ? {...selectedItem[header], name: e.target.value} // Update the 'name' property inside the object
                                                    : e.target.value // Set the value directly if it's not an object
                                            });
                                        }}

                                    />
                                </FormControl>
                            </React.Fragment>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddItem}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Update Modal */}
            {isUpdateModalOpen && (<Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update {selectedCategory.slice(0, -1)}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {headers.map(header => (
                            <React.Fragment key={header}>
                                <FormControl mt={4}>
                                    <FormLabel>{header}</FormLabel>
                                    <Input
                                        placeholder={header}
                                        defaultValue={
                                            typeof selectedItem?.[header] === "object" && selectedItem[header] !== null
                                                ? selectedItem[header]?.name || ""
                                                : selectedItem?.[header] || ""
                                        }
                                        onChange={(e) => {
                                            setNewItem({
                                                ...newItem,
                                                [header]: typeof selectedItem?.[header] === "object" && selectedItem[header] !== null
                                                    ? {...selectedItem[header], name: e.target.value} // Update the 'name' property inside the object
                                                    : e.target.value // Set the value directly if it's not an object
                                            });
                                        }}

                                    />
                                </FormControl>
                            </React.Fragment>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleUpdateItem}>
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>)}
        </Box>
    );
};

export default AdminPage;