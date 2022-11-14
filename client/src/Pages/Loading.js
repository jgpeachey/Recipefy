import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Loading() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const app_name = "recipefy-g1";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:3001/" + route;
    }
  }

  useEffect(() => {
    Axios.post(buildPath('user/verify'), {
      userId: searchParams.get("id"),
      emailToken: searchParams.get("token")
    })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);
}