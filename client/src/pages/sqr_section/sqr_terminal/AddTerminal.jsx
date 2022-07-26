import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { generateRandomString } from "../../../components/Validation/Generator/generateRandomString";
import { SchemaVerifyStaticTerminal } from "../../../components/Validation/Verification/ValidationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  ErrorMessage,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";

const AddTerminal = () => {
  const [Providers, setProvider] = useState([]);
  const initializeValue = { external_checksum_key: generateRandomString() };
  const [formValues, setFormValue] = useState(initializeValue);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyStaticTerminal),
    mode: "onChange",
    value: {
      provider_id: "",
      terminal_id: "",
      local_terminal_id: "",
      local_terminal_password: "",
      active: "",
    },
  });

  const changeCase = (event) => {
    event.target.value = event.target.value.toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };

  async function getProvider() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/provider", config);
      setProvider(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }
  useEffect(() => {
    getProvider();
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const onHandleSubmit = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.post("/terminals/add", { ...data, ...formValues }, config);
      toast.success("Терминал успешно добавлена!");
      setTimeout(() => {
        navigate("/");
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
    <SmallMainScreen title="Новый Терминал">
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="col-md-6">
            <label htmlFor="terminal" className="form-label">
              TERMINALID (прим. XY0000000000)
            </label>
            <input
              type="text"
              className="form-control box"
              id="terminal"
              name="terminal_id"
              onInput={changeCase}
              {...register("terminal_id")}
            />
            <ErrorMessage>{errors.terminal_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              PROVIDERID
            </label>
            <select
              name="provider_id"
              id="name"
              {...register("provider_id")}
              className="form-select"
              aria-label="Disabled select example"
            >
              <option></option>
              {Providers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.provider_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="local_terminal_id" className="form-label">
              LOCALID
            </label>
            <input
              type="text"
              className="form-control box"
              id="local_terminal_id"
              name="local_terminal_id"
              {...register("local_terminal_id")}
            />
            <ErrorMessage>{errors.local_terminal_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="local_terminal_password" className="form-label">
              LOCALPASSWORD
            </label>
            <input
              type="text"
              className="form-control box"
              id="local_terminal_password"
              name="local_terminal_password"
              {...register("local_terminal_password")}
            />
            <ErrorMessage>
              {errors.local_terminal_password?.message}
            </ErrorMessage>
          </div>

          <div className="col-md-12">
            <label htmlFor="external_checksum_key" className="form-label">
              CHECKSUMKEY
            </label>
            <input
              type="text"
              className="form-control box"
              id="external_checksum_key"
              name="external_checksum_key"
              value={formValues.external_checksum_key}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="activeCode" className="form-label">
              ACTIVE
            </label>
            <select
              name="active"
              id="activeCode"
              className="form-select"
              {...register("active")}
            >
              <option value={1}>Active</option>
              <option value={0}>Not Active</option>
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

export default AddTerminal;
