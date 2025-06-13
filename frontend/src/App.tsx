import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MatchPage from "./pages/MatchPage";
import ManageTeams from "./pages/Manageteams";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/match/:match_id" element={<MatchPage />} />
                <Route path="/manage-teams" element={<ManageTeams />} />
            </Routes>
        </Router>
    );
}
export default App;
