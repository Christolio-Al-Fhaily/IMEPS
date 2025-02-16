import {useState} from "react";
import {Button, Card, Container, FormControl, FormLabel, Heading, Input, useToast, VStack,} from "@chakra-ui/react";
import useAxiosAuth from "../hooks/useAxiosAuth";
import {useNavigate} from "react-router-dom";
import {useUser} from "../services/UserServices.tsx";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const {user, setUser} = useUser()

    const axiosInstance = useAxiosAuth(email, password);

    const login = async () => {
        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please enter both email and password",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/login", {email, password});
            const user = response.data; // Assuming the response contains the user object

            // Save the user object in localStorage
            localStorage.setItem("user", JSON.stringify(user));

            toast({
                title: "Success",
                description: "Logged in successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setUser(user);
            // Redirect based on isAdmin status
            if (user.isAdmin) {
                navigate("/admin"); // Redirect to admin page
            } else {
                navigate("/user"); // Redirect to user page
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to log in. Please check your credentials.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        await login();
    };

    return (
        <Container maxW="lg" centerContent my={"50"} color={"black"}>
            <Card p={8} boxShadow="lg" borderRadius="lg" bg="white" w="100%" textAlign="center">
                <Heading size="xl" mb={6}>
                    Login
                </Heading>

                <VStack spacing={4}>
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button
                        backgroundColor="primary"
                        width="full"
                        onClick={handleLogin}
                        color={"white"}
                        isLoading={isLoading}
                        loadingText="Logging in..."
                    >
                        Login
                    </Button>
                </VStack>
            </Card>
        </Container>
    );
};

export default LoginPage;