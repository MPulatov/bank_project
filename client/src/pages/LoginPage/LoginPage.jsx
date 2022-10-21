import React, { useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Loading } from "../../components/Loading";
import { ErrorMessages } from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/actions/userActions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../components/Style/styledComponent/StyledComponents";

const Schema = yup.object().shape({
  name: yup
    .string()
    .required("Пожалуйста, введите имя ползоателя")
    .min(3, "Пожалуйста, введите не меньше 3 символов."),
  password: yup.string().required("Пожалуйста, введите парол").min(4),
});

export const LoginPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    dispatch(login({ ...data }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
    mode: "onChange",
    value: {
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="loginContainer" style={{ paddingRight: "220px" }}>
      {loading && <Loading />}
      {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
      <div
        style={{ height: "70vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ width: 400 }}>
          <Card className="p-3">
            <h1 className="text-center">Sign in</h1>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  {...register("name")}
                />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password")}
                />

                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Sign In
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};
