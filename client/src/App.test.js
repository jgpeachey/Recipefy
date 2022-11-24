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

test("Recipe Card showing correctly", () => {
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

describe("API tests from frontend", () => {
  test("getLikedRecipes", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/getLikedRecipes") {
        return Promise.resolve({
          data: [
            {
              _id: "636704ff83f2c5c924ddb5db",
              User_ID: "63629343630fd6eaa0fe00b2",
              Title: "haram meal",
              Ingredients: ["pork", "bacon", "vodka", "shark"],
              Instructions: [
                "mix that ish together",
                "no cap",
                "youre going to jahanam",
              ],
              Likes: 0,
              Pic: "https://res.cloudinary.com/dnkvi73mv/image/upload/v1668547871/pexels-ella-olsson-1640777_k7oghj.jpg",
              Title: "haram meal",
              User_ID: "63629343630fd6eaa0fe00b2",
              index: 7,
              __v: 0,
              _id: "636704ff83f2c5c924ddb5db",
            },
          ],
        });
      }
    });
  });
  test("addrecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/addrecipe") {
        return Promise.resolve({
          data: {
            User_ID: "63629343630fd6eaa0fe00b2",
            Title: "Cheese Burger",
            Ingredients: ["cheese", "burger"],
            Instructions: ["create cheese burger"],
            Calories: 875,
            Sodium: 100,
            Description: "this good",
          },
        });
      }
    });
  });
  test("removerecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/getLikedRecipes") {
        return Promise.resolve({
          data: {
            _id: "636704ff83f2c5c924ddb5db",
            // User_ID: "63629343630fd6eaa0fe00b2",
          },
        });
      }
    });
  });
  test("findrecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/findrecipe") {
        return Promise.resolve({
          data: {
            page: 1,
            count: 9,
            search: "haram meal",
            // _id: "636704ff83f2c5c924ddb5db",
            // User_ID: "63629343630fd6eaa0fe00b2",
          },
        });
      }
    });
  });
  test("getUserRecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/getUserRecipe") {
        return Promise.resolve({
          data: {
            page: 1,
            count: 9,
            userId: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("findAllRecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/findAllRecipe") {
        return Promise.resolve({
          data: {
            page: 1,
            count: 9,
            userId: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("likerecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/likerecipe") {
        return Promise.resolve({
          data: {
            recipeId: "636fcc87dced3d921c73669f",
            userId: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("unlikerecipe", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/recipe/unlikeRecipe") {
        return Promise.resolve({
          data: {
            recipeId: "636fcc87dced3d921c73669f",
            userId: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("register", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/register") {
        return Promise.resolve({
          data: {
            Firstname: "afedasfaf",
            Lastname: "adfafdasfas",
            Username: "afdafafaf",
            Email: "hello@gmail.com",
            Pic: "",
            Password: "12345",
          },
        });
      }
    });
  });
  test("login", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/login") {
        return Promise.resolve({
          data: {
            Email: "hello@gmail.com",
            Password: "12345",
          },
        });
      }
    });
  });
  test("updateuser", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/updateuser") {
        return Promise.resolve({
          data: {
            Email: "test@test.com",
            Password: "123456",
            Info: {
              Firstname: "tester",
            },
          },
        });
      }
    });
  });
  test("deleteuser", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/deleteuser") {
        return Promise.resolve({
          data: {
            Email: "test@test.com",
            Password: "123456",
          },
        });
      }
    });
  });
  test("searchUsers", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/searchUsers") {
        return Promise.resolve({
          data: {
            page: 1,
            count: 9,
            search: "cheese",
          },
        });
      }
    });
  });
  test("getFollowers", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/getFollowers") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("getFollowing", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/getFollowing") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("followUser", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/followUser") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("unfollowUser", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/unfollowUser") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("getFollowersById", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/getFollowersById") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
  test("getFollowingsById", () => {
    axios.get.mockImplementation((url) => {
      if (url === "/user/getFollowingsById") {
        return Promise.resolve({
          data: {
            _id: "63729fc72304b9f55f466529",
          },
        });
      }
    });
  });
});

// render(
//   <BrowserRouter>
//     <NewAppBar />
//   </BrowserRouter>
// );
// const loginElement = screen.getAllByText(/Login/i);
// expect(loginElement).toBeTruthy();

// const registerElement = screen.getAllByText(/Register/i);
// expect(registerElement).toBeTruthy();

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
