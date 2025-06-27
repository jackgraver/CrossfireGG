import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MatchPage from "./pages/MatchPage";
import ManageTeams from "./pages/ManageTeams";
import SignIn from "./pages/users/SignIn";
import SignUp from "./pages/users/SignUp";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import MatchStats from "./pages/MatchStats";
import Team from "./pages/Team";
import Casting from "./pages/Casting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/match/:match_id" element={<MatchPage />} />
                    <Route path="/manage-teams" element={<ManageTeams />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/stats/:match_id" element={<MatchStats />} />
                    <Route path="/team/:team_id" element={<Team />} />
                    <Route path="/casting" element={<Casting />} />
                </Routes>
                <Footer />
            </Router>
        </QueryClientProvider>
    );
}
export default App;
