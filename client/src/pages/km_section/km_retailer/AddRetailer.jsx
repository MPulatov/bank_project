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
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { SchemaVerifyKmRetailer } from "../../../components/Validation/Verification/ValidationSchema";

const AddRetailer = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyKmRetailer),
    mode: "onChange",
    value: {
      name: "",
      addres: "",
      description: "",
      km_retailerid: "",
      ein: "",
      inn: "",
      number: "",
      active: "",
      rnm: "",
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
        "/retailers/add",
        {
          ...data,
        },
        config
      );
      toast.success("Retailer успешно добавлена!");
      setTimeout(() => {
        navigate("/retailer");
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

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <SmallMainScreen title="Новый Retailer">
      {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
      <Container>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="names" className="form-label">
              Retailer name
            </label>
            <input
              type="text"
              className="form-control box"
              id="names"
              name="name"
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control box"
              id="address"
              name="addres"
              {...register("addres")}
            />
            <ErrorMessage>{errors.addres?.message}</ErrorMessage>
          </div>

          <div className="col-md-12">
            <label htmlFor="descriptions" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control box"
              id="descriptions"
              name="description"
              {...register("description")}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="retailerid" className="form-label">
              KM Retailer Id
            </label>
            <input
              type="text"
              className="form-control box"
              id="retailerid"
              name="km_retailerid"
              {...register("km_retailerid")}
            />
            <ErrorMessage>{errors.km_retailerid?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="actives" className="form-label">
              Terminal Status
            </label>
            <select
              id="actives"
              className="form-select"
              aria-label="Disabled select example"
              name="active"
              {...register("active")}
            >
              <option></option>
              <option value={1}>Active</option>
              <option value={0}>Not Active</option>
            </select>
            <ErrorMessage>{errors.active?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="ein" className="form-label">
              EIN
            </label>
            <input
              type="text"
              className="form-control box"
              id="ein"
              name="ein"
              {...register("ein")}
            />
            <ErrorMessage>{errors.ein?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="inns" className="form-label">
              INN
            </label>
            <input
              type="text"
              className="form-control box"
              id="inns"
              name="inn"
              {...register("inn")}
            />
            <ErrorMessage>{errors.inn?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="numbers" className="form-label">
              Number
            </label>
            <input
              type="text"
              className="form-control box"
              id="numbers"
              name="number"
              {...register("number")}
            />
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="rnm" className="form-label">
              RNM
            </label>
            <input
              type="text"
              className="form-control box"
              id="rnm"
              name="rnm"
              {...register("rnm")}
            />
            <ErrorMessage>{errors.rnm?.message}</ErrorMessage>
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

export default AddRetailer;
