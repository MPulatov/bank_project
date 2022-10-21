import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateRandomStringCKMS } from "../../../components/Validation/Generator/generateRandomString";
import {
  Container,
  ErrorMessage,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { SchemaVerifyPosRequests } from "../../../components/Validation/Verification/ValidationSchema";
const initialState = {
  imei: "",
  term_inn: "",
  term_ein: "",
  term_rnm: "",
  term_sn: "",
};

const initialStateImei = {
  imei: "",
};

const AddPosRequests = () => {
  const [otpCode, setOtpCode] = useState(generateRandomStringCKMS());
  // FETCHING DATA
  const [Terminal, setTerminal] = useState([]);
  const [value, setValue] = useState(initialState);
  const [terminalsImei, setTerminalsImei] = useState(initialStateImei);
  const [changeId, setChangeId] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
    }
  }

  const InputChangeId = (e) => {
    setChangeId(e.target.value);
  };

  useEffect(() => {
    async function getPosRequestsById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (terminalsImei.imei != null) {
        $host
          .get(`/posrequests/${terminalsImei.imei}`, config)
          .then((res) => setValue({ ...res.data[0] }))
          .catch((error) => setError(error.response.data.message));
      }
      return;
    }
    getPosRequestsById();
  }, [setValue, terminalsImei]);

  useEffect(() => {
    async function getTerminalById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/terminal/${changeId}`, config)
        .then((res) => setTerminalsImei({ ...res.data.results.data[0] }))
        .catch((error) =>
          // setError(
          //   error.response && error.response.data.message
          //     ? error.response.data.message
          //     : error.message
          // )
          console.log(error.message)
        );
    }
    getTerminalById();
  }, [changeId]);

  useEffect(() => {
    getTerminals();
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyPosRequests),
    mode: "onChange",
    value: {
      ...value.term_ein,
      ...value.term_inn,
      ...value.term_sn,
      ...value.term_rnm,
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
        "/posrequests/add",
        {
          otp_code: otpCode,
          term_imei: terminalsImei.imei,
          ...data,
        },
        config
      );
      toast.success("Организация успешно добавлена!");
      setTimeout(() => {
        navigate("/posrequests");
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
    <SmallMainScreen title={"Новый Идентификаторы Терминала"}>
      {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
      <Container>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="termImei" className="form-label">
              IMEI
            </label>
            <select
              name="changeId"
              id="termImei"
              className="form-select box"
              aria-label="Disabled select example"
              onChange={InputChangeId}
            >
              <option value=""></option>
              {Terminal.map((item) => (
                <option key={item.term_id} value={item.term_id}>
                  {item.imei}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="termInn" className="form-label">
              ИНН
            </label>
            <input
              type="text"
              className="form-control box"
              id="termInn"
              name="term_inn"
              defaultValue={value.inn || ""}
              {...register("term_inn")}
            />
            <ErrorMessage>{errors.term_inn?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="termEin" className="form-label">
              ЕИН
            </label>
            <input
              type="text"
              className="form-control box"
              id="termEin"
              name="term_ein"
              defaultValue={value.ein || ""}
              {...register("term_ein")}
            />
            <ErrorMessage>{errors.term_ein?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="termRnm" className="form-label">
              РНМ
            </label>
            <input
              type="text"
              className="form-control box"
              id="termRnm"
              name="term_rnm"
              defaultValue={value.rnm || ""}
              {...register("term_rnm")}
            />
            <ErrorMessage>{errors.term_rnm?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="termSn" className="form-label">
              СН
            </label>
            <input
              type="text"
              className="form-control box"
              id="termSn"
              name="term_sn"
              defaultValue={value.devicesn || ""}
              {...register("term_sn")}
            />
            <ErrorMessage>{errors.term_sn?.message}</ErrorMessage>
          </div>
          <div className="col-md-6">
            <label htmlFor="otpCode" className="form-label">
              OTP код:
            </label>
            <input
              type="text"
              className="form-control box"
              id="otpCode"
              name="otpCode"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              disabled
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success box">
              Сохранить
            </button>
          </div>
        </form>
      </Container>
      <ToastContainer />
    </SmallMainScreen>
  );
};

export default AddPosRequests;
