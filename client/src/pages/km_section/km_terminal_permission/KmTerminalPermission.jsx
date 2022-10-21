import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ErrorMessage,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SchemaVerifyKmTerminalPremission } from "../../../components/Validation/Verification/ValidationSchema";

const Option_card = [
  { id: 115, name: "Снятие наличных" },
  { id: 117, name: "Запрос баланса" },
  { id: 135, name: "Перевод" },
  { id: 138, name: "Мини выпыска" },
  { id: 140, name: "Внесение наличных" },
];

const Option_products = [
  { id: 110, name: "Покупка" },
  { id: 114, name: "Возврат товара" },
];

const initialState = {
  terminal_type_id: "",
};

const KmTerminalPermission = () => {
  const [terminalTypeId, setTerminalTypeId] = useState("");
  const [terminalById, setTerminalById] = useState(initialState);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // FETCHING DATA
  const [Terminal, setTerminal] = useState([]);

  const InputValue = (e) => {
    setTerminalTypeId(e.target.value);
  };

  const { terminal_type_id } = terminalById;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyKmTerminalPremission),
    mode: "onChange",
    value: {
      transaction_code: "",
      terminal_id: "",
    },
  });

  // AXIOS

  useEffect(() => {
    async function getTerminalById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/terminal/${terminalTypeId}`, config)
        .then((res) => setTerminalById({ ...res.data.results.data[0] }))
        .catch((error) =>
          console.error(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
    }
    getTerminalById();
  }, [terminalTypeId]);

  // AXIOS
  async function getTerminals() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/terminal", config);
      setTerminal(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
      toast.error("Ошибка: Проверьте пожалуйста, все ли правильно!!!");
    }
  }

  useEffect(() => {
    getTerminals();
  }, []);

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.post("/terminal/permission/add", { ...data }, config);
      toast.success("Terminal Permission успешно добавлена!");
      setTimeout(() => {
        navigate("/permission");
      }, 1000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  return (
    <SmallMainScreen title={"Новый KM Терминал Permission"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="terminalId" className="form-label">
              Терминал Корти Милли{" "}
            </label>
            <select
              name="terminal_id"
              id="terminalId"
              className="form-select"
              aria-label="Disabled select example"
              {...register("terminal_id")}
              onInput={InputValue}
            >
              <option value=""></option>
              {Terminal.map((item) => (
                <option key={item.term_id} value={item.term_id}>
                  {item.terminal_name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.terminal_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="transactionCode" className="form-label">
              {" "}
              Transaction Name{" "}
            </label>
            <select
              name="transaction_code"
              id="transactionCode"
              className="form-select"
              aria-label="Disabled select example"
              {...register("transaction_code")}
            >
              <option value=""></option>
              {terminal_type_id === 1 || terminal_type_id === 2
                ? Option_card.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))
                : terminal_type_id === 3 &&
                  Option_products.map((products) => (
                    <option key={products.id} value={products.id}>
                      {products.name}
                    </option>
                  ))}
            </select>
            <ErrorMessage>{errors.transaction_code?.message}</ErrorMessage>
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

export default KmTerminalPermission;
