import {useState} from "react";
import {Button, Card, Container, FormControl, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import useAxiosAuth from "../hooks/useAxiosAuth.tsx";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const api = useAxiosAuth(email, password);
    const handleLogin = async () => {
        // Add login logic here
        try {
            const response = await api.post("/login");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    return (
        <Container maxW="lg" centerContent my={"50"} color={"black"}>
            <Card
                p={8}
                boxShadow="lg"
                borderRadius="lg"
                bg="white"
                w="100%"
                textAlign="center"
            >
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
