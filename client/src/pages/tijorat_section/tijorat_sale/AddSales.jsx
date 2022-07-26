import React, { useState, useEffect } from "react";
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
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { SchemaVerifyTijoratSale } from "../../../components/Validation/Verification/ValidationSchema";

const AddSales = () => {
  const [Sales, setSale] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function getSales() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/organization", config);
      setSale(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  useEffect(() => {
    getSales();
    if (!userInfo) {
      navigate("/login");
    }
  }, [setSale, userInfo, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyTijoratSale),
    mode: "onChange",
    value: {
      name: "",
      organization_id: "",
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
        "/favri/sales/add",
        {
          ...data,
        },
        config
      );
      toast.success("Точки продаж успешно добавлена!");
      setTimeout(() => {
        navigate("/sale");
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
    <SmallMainScreen title={"Новый Точки Продаж"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              type="text"
              className="form-control box"
              id="name"
              name="name"
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
              {Sales.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.organization_name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.organization_id?.message}</ErrorMessage>
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

export default AddSales;
