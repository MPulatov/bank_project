import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";

const initialState = {
  transaction_code: "",
  terminal_id: "",
};

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

const KmTerminalPermissionUpdate = () => {
  const [TerminalPermissionUpdate, setTerminalPermissionUpdate] =
    useState(initialState);
  const [Terminal, setTerminal] = useState([]);
  const [terminalTypeId, setTerminalTypeId] = useState("");
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { transaction_code, terminal_id } = TerminalPermissionUpdate;

  const InputValue = (e) => {
    setTerminalTypeId(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerminalPermissionUpdate({
      ...TerminalPermissionUpdate,
      [name]: value,
    });
  };

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
      console.error("TERMINALS PERMISSION", { Ошибка: error.message });
    }
  }

  useEffect(() => {
    async function KmPremissionById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/terminal/permission/${id}`, config)
        .then((res) => setTerminalPermissionUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    KmPremissionById();
    getTerminals();
    // if (!userInfo) {
    //   navigate("/login");
    // }
  }, [id, userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.patch(
        `/terminal/permission/update/${id}`,
        {
          transaction_code,
          terminal_id,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/permission");
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
    <SmallMainScreen title={"Изменить Терминал Permission"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="select" className="form-label">
              Терминал Корти Милли{" "}
            </label>
            <select
              name="terminal_id"
              id="select"
              className="form-select"
              aria-label="Disabled select example"
              onChange={handleInputChange}
              onInput={InputValue}
            >
              <option value=""></option>
              {Terminal.map((item) => (
                <option key={item.term_id} value={item.terminal_type_id}>
                  {item.terminal_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              {" "}
              Transaction Name{" "}
            </label>
            <select
              name="transaction_code"
              id="name"
              className="form-select"
              aria-label="Disabled select example"
              onChange={handleInputChange}
            >
              <option value=""></option>
              {terminalTypeId === "1" || terminalTypeId === "2"
                ? Option_card.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))
                : terminalTypeId === "3"
                ? Option_products.map((products) => (
                    <option key={products.id} value={products.id}>
                      {products.name}
                    </option>
                  ))
                : ""}
            </select>
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
export default KmTerminalPermissionUpdate;
