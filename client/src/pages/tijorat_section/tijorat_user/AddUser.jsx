import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  ErrorMessage,
} from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SchemaVerifyTijoratUser } from "../../../components/Validation/Verification/ValidationSchema";

const AddUser = () => {
  const [Users, setUsers] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function getUsers() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/organization", config);
      setUsers(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  useEffect(() => {
    getUsers();
    if (!userInfo) {
      navigate("/login");
    }
  }, [setUsers, userInfo, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyTijoratUser),
    mode: "onChange",
    value: {
      fullname: "",
      email: "",
      password: "",
      organization_id: "",
      active: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.post(
        "/favri/users/add",
        {
          ...data,
        },
        config
      );
      toast.success("Пользовател успешно добавлена!");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
      toast.error("Ошибка: Проверьте пожалуйста, все ли правильно!!!");
    }
  };

  return (
    <SmallMainScreen title={"Новый Пользователь"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="fullname" className="form-label">
              ФИО
            </label>
            <input
              type="text"
              className="form-control box"
              id="fullname"
              name="fullname"
              {...register("fullname")}
            />
            <ErrorMessage>{errors.fullname?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Имя организации
            </label>
            <select
              name="organization_id"
              id="name"
              className="form-select"
              aria-label="Disabled select example"
              {...register("organization_id")}
            >
              <option></option>
              {Users.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.organization_name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.organization_id?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control box"
              id="email"
              name="email"
              {...register("email")}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="text"
              className="form-control box"
              id="password"
              name="password"
              {...register("password")}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="active" className="form-label">
              Статус
            </label>
            <select
              name="active"
              id="active"
              className="form-select"
              aria-label="Disabled select example"
              {...register("active")}
            >
              <option></option>
              <option value="1">Active</option>
              <option value="0">Not Active</option>
            </select>
            <ErrorMessage>{errors.active?.message}</ErrorMessage>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success box">
              Создать
            </button>
          </div>
        </form>
        <ToastContainer />
      </Container>
    </SmallMainScreen>
  );
};

export default AddUser;
