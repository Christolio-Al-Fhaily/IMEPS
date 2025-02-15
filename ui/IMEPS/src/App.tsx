import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {Box} from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage.tsx";
import UniversityPage from "./pages/UniversityPage.tsx";
import Adminpage from "./pages/AdminPage.tsx";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <Box backgroundColor={"white"} height={"100vh"} width={"100vw"} overflow={"hidden"}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    {<Route path="/universities" element={<UniversityPage/>}/>}
                    {<Route path="/admin" element={<Adminpage/>}/>}
                    {/*<Route path="/bourses" element={<Bourse/>}/>*/}
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
