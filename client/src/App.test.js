import { render, screen, fireEvent } from "@testing-library/react";

import axios from "axios";
import Home from "./Pages/Home";
import Loading from "./Pages/Loading";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Favorite from "./Pages/Favorite";
import AddRecipe from "./Pages/AddRecipe";
import Profile from "./Pages/Profile";
import Forgot from "./Pages/Forgot";
import { BrowserRouter } from "react-router-dom";
import RecipeCard from "./Components/RecipeCard";
import HomeAppBar from "./Components/HomeAppBar";
import NewAppBar from "./Components/NewAppBar";
import ImageCarousel from "./Components/ImageCarousel";

jest.mock("axios");

test("Login page showing correctly", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const signElement = screen.getAllByText(/Sign in/i);
  expect(signElement).toBeTruthy();

  const linkElement = screen.getAllByText(/Forgot password/i);
  expect(linkElement).toBeTruthy();
});

test("Register page showing correctly", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const signElement = screen.getAllByText(/Sign up/i);
  expect(signElement).toBeTruthy();

  const linkElement = screen.getAllByText(/Already have an account/i);
  expect(linkElement).toBeTruthy();
});

test("AddRecipe page showing correctly", () => {
  render(
    <BrowserRouter>
      <AddRecipe />
    </BrowserRouter>
  );
  const shareElement = screen.getAllByText(/Share a Recipe/i);
  expect(shareElement).toBeTruthy();
});

test("Forgot page showing correctly", () => {
  render(
    <BrowserRouter>
      <Forgot />
    </BrowserRouter>
  );
  const forgotElement = screen.getAllByText(/Forgot Password/i);
  expect(forgotElement).toBeTruthy();
});

test("HomeAppBar showing correctly", () => {
  render(
    <BrowserRouter>
      <HomeAppBar />
    </BrowserRouter>
  );
  const logoutElement = screen.getAllByText(/Logout/i);
  expect(logoutElement).toBeTruthy();
});

test("NewAppBar showing correctly", () => {
  render(
    <BrowserRouter>
      <NewAppBar />
    </BrowserRouter>
  );
  const loginElement = screen.getAllByText(/Login/i);
  expect(loginElement).toBeTruthy();

  const registerElement = screen.getAllByText(/Register/i);
  expect(registerElement).toBeTruthy();
});

// describe("Favorite Page", () => {
//   const dummy = [
//     {
//       _id: "636704ff83f2c5c924ddb5db",
//       User_ID: "63629343630fd6eaa0fe00b2",
//       Title: "haram meal",
//       Ingredients: ["pork", "bacon", "vodka", "shark"],
//       Instructions: [
//         "mix that ish together",
//         "no cap",
//         "youre going to jahanam",
//       ],
//       Likes: 0,
//       Pic: "https://res.cloudinary.com/dnkvi73mv/image/upload/v1668547871/pexels-ella-olsson-1640777_k7oghj.jpg",
//       Title: "haram meal",
//       User_ID: "63629343630fd6eaa0fe00b2",
//       index: 7,
//       __v: 0,
//       _id: "636704ff83f2c5c924ddb5db",
//     },
//   ];

//   test("Favorite showing correctly", () => {
//     render(
//       <BrowserRouter>
//         <Favorite />
//       </BrowserRouter>
//     );

//     axios.get.mockResolvedValue({ data: dummy });

//     const favorites = () => screen.getAllByTestId("comment");

//     const loginElement = screen.getAllByText(/Login/i);
//     expect(loginElement).toBeTruthy();

//     const registerElement = screen.getAllByText(/Register/i);
//     expect(registerElement).toBeTruthy();
//   });
// });
