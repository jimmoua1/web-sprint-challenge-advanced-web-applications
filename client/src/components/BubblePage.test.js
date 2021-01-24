import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// Fetch Colors with utils/axiosWithAuthorization
const fetchColors = () => {
  axiosWithAuth()
    .get("/api/colors")
    .then((response) => setColorList(response.data))
    .catch((error) => console.log(error.response.data));
};
// Mock Data Fetching Colors
let mockFetchColors = fetchColors();
// Mocking the Data (code line above)
jest.mock(mockFetchColors);
console.log("colors", mockFetchColors);

describe("Colors test", ()=>{
  test('Renders without error', ()=>{
    render(<BubblePage colors={[]}/>);
  });
  // The Data Color that is being tested from Server.js default color code
  test("Fetches data and renders the bubbles", async () => {
    const mockColors = [
      {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff",
        },
        id: 1,
      },
      {
        color: "limegreen",
        code: {
          hex: "#99ddbc",
        },
        id: 2,
      },
      {
        color: "aqua",
        code: {
          hex: "#00ffff",
        },
        id: 3,
      },
    ];
    // rerender test (include code line 50) for BubblePage Component
    const { rerender } = render(<BubblePage mockColors={[]} />);
    // rerender component BubblePage
    rerender(<BubblePage mockColors={mockColors} />);
    // Async code test for text 
    expect(await screen.findByText(/bubbles/i)).toBeInTheDocument();
    expect(await screen.findByText(/colors/i)).toBeInTheDocument();
    });
})