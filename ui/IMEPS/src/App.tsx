import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {Box} from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage.tsx";

const App = () => {
    return (
        <Router>
            <Navbar width={"full"}/>
            <Box backgroundColor={"white"} height={"100vh"} width={"100vw"} overflow={"hidden"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    {/*<Route path="/universities" element={<University/>}/>*/}
                    {/*<Route path="/bourses" element={<Bourse/>}/>*/}
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
