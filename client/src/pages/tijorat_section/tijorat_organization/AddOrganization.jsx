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
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SchemaVerifyTijoratOrganization } from "../../../components/Validation/Verification/ValidationSchema";

const AddOrganization = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyTijoratOrganization),
    mode: "onChange",
    value: {
      organization_name: "",
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
        "/favri/organization/add",
        {
          ...data,
        },
        config
      );
      toast.success("Организация успешно добавлена!");
      setTimeout(() => {
        navigate("/organization");
      }, 2000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
      toast.error("Ошибка: Проверьте пожалуйста, все ли правильно!!!");
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <SmallMainScreen title={"Новая Организация"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="organization" className="form-label">
              Введите название организации
            </label>
            <input
              type="text"
              className="form-control box"
              id="organization"
              name="organization_name"
              {...register("organization_name")}
            />
            <ErrorMessage>{errors.organization_name?.message}</ErrorMessage>
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

export default AddOrganization;
