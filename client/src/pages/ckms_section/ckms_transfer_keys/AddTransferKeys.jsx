import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { SchemaVerifyCkmsTransferKey } from "../../../components/Validation/Verification/ValidationSchema";

const initialState = {
  provider_id: "",
  terminal_id: "",
  external_checksum_key: "",
};

const AddTransferKeys = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [terminalById, setTerminalById] = useState([]);
  const [terminalOneId, getTerminalOneId] = useState("");
  const [terminalInfoOneById, getTerminalInfoOneById] = useState(initialState);
  const { provider_id, terminal_id, external_checksum_key } =
    terminalInfoOneById;
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyCkmsTransferKey),
    mode: "onChange",
    value: {
      id: "",
    },
  });

  useEffect(() => {
    async function getTerminalById() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await $host.get("/transfer/key", config);
        setTerminalById(response.data);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(message);
      }
    }
    getTerminalById();
  }, [userInfo, setTerminalById]);

  useEffect(() => {
    async function getTermOneById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/transfer/key/${terminalOneId}`, config)
        .then((res) => getTerminalInfoOneById({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getTermOneById();
  }, [userInfo, terminalOneId]);

  const onSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.post(
        "/transfer/key/add",
        {
          id,
          terminal_id,
          provider_id,
          external_checksum_key,
        },
        config
      );
      toast.success("Организация успешно добавлена!");
      setTimeout(() => {
        navigate("/");
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

  const handleTerminalId = (e) => {
    getTerminalOneId(e.target.value);
  };

  return (
    <SmallMainScreen title={""}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="terminalId" className="form-label">
              ....
            </label>
            <select
              name="id"
              id="terminalId"
              className="form-select"
              aria-label="Disabled select example"
              onInput={handleTerminalId}
              {...register("id")}
            >
              <option></option>
              {terminalById.map((terminal, index) => (
                <option key={index} value={terminal.id}>
                  {terminal.terminal_id}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.id?.message}</ErrorMessage>
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

export default AddTransferKeys;
