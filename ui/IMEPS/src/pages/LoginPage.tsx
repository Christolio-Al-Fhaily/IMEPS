import { useState } from "react";
import {
    Button,
    Card,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack
} from "@chakra-ui/react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username: email,
                password: password
            });

            const { username, isAdmin } = response.data;

            // Store credentials for Basic Auth
            const credentials = btoa(`${email}:${password}`);
            localStorage.setItem("authToken", credentials);
            localStorage.setItem("username", username);
            localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

            console.log("Login Successful", response.data);
        } catch (error) {
            console.error("Error logging in", error);
        }
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

                    <Button backgroundColor="primary" width="full" onClick={handleLogin} color={"white"}>
                        Login
                    </Button>
                </VStack>
            </Card>
        </Container>
    );
};

export default LoginPage;
