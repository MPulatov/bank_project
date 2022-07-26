import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";

const initialState = {
  provider_id: "",
  terminal_id: "",
  local_terminal_id: "",
  local_terminal_password: "",
  active: "",
};

export const TerminalUpdate = () => {
  // Edit Button ----------------------------------------------------------
  const [terminalsUpdate, setTerminalUpdate] = useState(initialState);
  const {
    provider_id,
    terminal_id,
    local_terminal_id,
    local_terminal_password,
    active,
  } = terminalsUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const [Providers, setProvider] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerminalUpdate({ ...terminalsUpdate, [name]: value });
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
  }, []);

  useEffect(() => {
    async function getTerminalById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/terminals/${id}`, config)
        .then((res) => setTerminalUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getTerminalById();
    if (!userInfo) {
      navigate("/login");
    }
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
        `/terminals/update/${id}`,
        {
          ...terminalsUpdate,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
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
    <SmallMainScreen title="Изменить Терминал">
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="terminalId" className="form-label">
              TERMINALID
            </label>
            <input
              type="text"
              className="form-control box"
              id="terminalId"
              name="terminal_id"
              value={terminal_id || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              PROVIDERID
            </label>
            <select
              name="provider_id"
              id="name"
              value={provider_id || ""}
              onChange={handleInputChange}
              className="form-select"
            >
              <option></option>
              {Providers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="localTerminalId" className="form-label">
              LOCALTERMINALID
            </label>
            <input
              type="text"
              className="form-control box"
              id="localTerminalId"
              name="local_terminal_id"
              value={local_terminal_id || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="terminalpassword" className="form-label">
              TERMINAL PASSWORD
            </label>
            <input
              type="text"
              className="form-control box"
              id="terminalpassword"
              name="local_terminal_password"
              value={local_terminal_password || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="activeCode" className="form-label">
              Active
            </label>
            <select
              name="active"
              id="activeCode"
              className="form-select"
              value={active}
              onChange={handleInputChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Not Active</option>
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-success box">
              Сохранить
            </button>
          </div>
        </form>
        <ToastContainer />
      </Container>
    </SmallMainScreen>
  );
};

export default TerminalUpdate;
