import { useFormik } from "formik";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export function Home() {
  return (
    <div>
      welcome to home page
      <Formlogin />
    </div>
  );
}
function Formlogin() {
  const Navigate = useNavigate();
  const [formstate, setformstate] = useState("success");
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("https://database-bflr.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (data.status === 401) {
        console.log("❌Error");
        localStorage.clear();
      } else {
        const result = await data.json();
        // console.log("Success", result);
        if (data.status === 400) {
          localStorage.clear();
          Navigate("/");
          setformstate("error");
        } else {
          localStorage.setItem("token", result.token);
          Navigate("/mobiles");
          setformstate("success");
        }
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>login</h2>
      <TextField
        type="text"
        value={values.username}
        onChange={handleChange}
        name="username"
        label="username"
        id="outlined-basic"
        variant="outlined"
        className="form-input"
      />
      <TextField
        type="text"
        value={values.password}
        onChange={handleChange}
        name="password"
        label="password"
        id="outlined-basic"
        variant="outlined"
        className="form-input"
      />
      <Button
        className="form-input"
        type="submit"
        variant="contained"
        color={formstate}
      >
        {formstate === "success" ? "submit" : "Retry"}
      </Button>
    </form>
  );
}
