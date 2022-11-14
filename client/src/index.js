import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { CookiesProvider } from "react-cookie";
import Profile from "./Pages/Profile";
import Forgot from "./Pages/Forgot";
import AddRecipe from "./Pages/AddRecipe";
import Loading from "./Pages/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="/register" index element={<Register />} />
          <Route path="/home" index element={<Home />} />
          <Route path="/profile" index element={<Profile />} />
          <Route path="/forgotpassword" index element={<Forgot />} />
          <Route path="/addrecipe" index element={<AddRecipe />} />
          <Route path="/loading" index element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </>
);

//Login, Register, Forgot Password, User Profile Page, modal profile page of others, upload recipe, subscribed list, modal page of recipe, favorite recipes page, update recipe, search recipe

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
