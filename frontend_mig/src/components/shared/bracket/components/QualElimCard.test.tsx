// import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import QualElimCard from "./QualElimCard";
// import type { Team } from "../../../types/Types";

// describe("QualElimCard", () => {
//     // Mock team data
//     const mockTeam: Team = {
//         team_id: "1",
//         team_name: "Test Team",
//         seed: 1,
//         win: 3,
//         loss: 0,
//         paid: true,
//         joined_tournament: true,
//         team_logo: "",
//     };

//     it("renders qualified team correctly", () => {
//         render(<QualElimCard team={mockTeam} qualified={true} />);

//         // Check if team name is displayed
//         expect(screen.getByText("Test Team")).toBeInTheDocument();

//         // Check if seed is displayed
//         expect(screen.getByText("1")).toBeInTheDocument();

//         // Check if the card has the qualified (green) background class
//         const card = screen.getByTestId("qual-elim-card");
//         expect(card).toHaveClass("bg-green-500");
//     });

//     it("renders eliminated team correctly", () => {
//         render(<QualElimCard team={mockTeam} qualified={false} />);

//         // Check if team name is displayed
//         expect(screen.getByText("Test Team")).toBeInTheDocument();

//         // Check if seed is displayed
//         expect(screen.getByText("1")).toBeInTheDocument();

//         // Check if the card has the eliminated (red) background class
//         const card = screen.getByTestId("qual-elim-card");
//         expect(card).toHaveClass("bg-red-500");
//     });

//     it("renders team image", () => {
//         render(<QualElimCard team={mockTeam} qualified={true} />);

//         // Check if the image is rendered with correct attributes
//         const image = screen.getByAltText("?");
//         expect(image).toBeInTheDocument();
//         expect(image).toHaveAttribute(
//             "src",
//             "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//         );
//         expect(image).toHaveClass("w-6", "h-6");
//     });
// });
