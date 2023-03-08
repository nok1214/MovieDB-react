import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_KEY, BASE_URL } from "../apis/api";
import axios from "axios";

const loginValidation = yup.object({
  username: yup
    .string("Enter your user name")
    .matches(/^[a-zA-Z0-9_]*$/, "Enter a valid user name")
    .required("user name is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimun of 6 characters")
    .required("Password is required"),
});
export default function LoginPage({ setIsLogin, setUser }) {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    loginValidation: loginValidation,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setIsloading(true);
      setSubmitting(true);
      axios
        .get(`${BASE_URL}authentication/token/new?api_key=${API_KEY}`)
        .then((response) => {
          const request_token = response.data.request_token;
          const userData = {
            username: values.username,
            password: values.password,
            request_token,
          };
          return axios.post(
            `${BASE_URL}authentication/token/validate_with_login?api_key=${API_KEY}`,
            userData,
          );
        })
        .then((response) => {
          const validated_token = response.data.request_token;
          const sessionData = {
            request_token: validated_token,
          };
          return axios.post(
            `${BASE_URL}authentication/session/new?api_key=${API_KEY}`,
            sessionData,
          );
        })
        .then((response) => {
          const session_id = response.data.session_id;
          return axios
            .get(
              `${BASE_URL}account?api_key=${API_KEY}&session_id=${session_id}`,
            )
            .then((response) => {
              const user = {
                username: response.data.username,
                id: response.data.id,
                session_id: session_id,
              };
              localStorage.setItem("user", JSON.stringify(user));
              setIsLogin(true);
              setUser(user);
              navigate("/");
            });
        })
        .catch(() => {
          setErrors({ login: "Failed to login, Please try again." });
        })
        .finally(() => {
          setSubmitting(false);
          setIsloading(false);
        });
    },
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='username'
            name='username'
            label='username'
            type='text'
            variant='filled'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='password'
            type='password'
            variant='filled'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color='primary' fullWidth variant='contained' type='submit'>
            SUBMIT
          </Button>
        </form>
      )}
    </div>
  );
}
