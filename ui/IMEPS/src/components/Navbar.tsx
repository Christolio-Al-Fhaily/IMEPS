import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Box, Button, HStack, Image} from "@chakra-ui/react";
import ulfg2logo from "../assets/ulfg2logo.jpg";


const Navbar = () => {
    const navigate = useNavigate();
    return (
        <HStack background={"primary"} width={"100vw"} height={"50px"}>
            <Image src={ulfg2logo} h={"100%"}/>
            <Box flex={"1"} display={"flex"} justifyContent={"center"} gap={"4"}>
                <Button background={"primary"} color={"white"} onClick={() => navigate("/")}>
                    Home
                </Button>
                <Button background={"primary"} color={"white"} onClick={() => navigate("/universities")}>
                    Universities
                </Button>
                <Button background={"primary"} color={"white"} onClick={() => navigate("/scholarships")}>
                    Scholarships
                </Button>
            </Box>
            <Box py={"2"}>
                <Button background={"primary"} color={"white"} alignSelf={"left"} mr={"4"} _hover={{bg: "secondary"}} onClick={() => navigate("/login")}>Login</Button>
            </Box>
        </HStack>
    );
};

export default Navbar;
