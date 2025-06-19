import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MatchPage from "./pages/MatchPage";
import ManageTeams from "./pages/ManageTeams";
import SignIn from "./pages/users/SignIn";
import SignUp from "./pages/users/SignUp";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/match/:match_id" element={<MatchPage />} />
                <Route path="/manage-teams" element={<ManageTeams />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
            <Footer />
        </Router>
    );
}
export default App;
