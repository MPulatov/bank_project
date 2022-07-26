import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ErrorMessage,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";
import { SchemaVerifyKmTerminal } from "../../../components/Validation/Verification/ValidationSchema";

const Initialize = [
  "P1N-G",
  "P1_4G-EU",
  "P1N",
  "P1_4G",
  "P1N-AMA",
  "P1_4G-AMA",
];
const InitializeOptions = [
  { value: 1, name: "Банкомат" },
  { value: 2, name: "ПВН" },
  { value: 3, name: "ПТС" },
];

const AddKmTerminal = () => {
  // FETCHING DATA
  const [Retailers, setRetailer] = useState([]);
  const [terminalId, setTerminalId] = useState("");
  const [term_qr_data, setQrCodeData] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const TerminalInputChange = (e) => {
    setTerminalId(e.target.value);
  };

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaVerifyKmTerminal),
    mode: "onChange",
    value: {
      location: "",
      terminal_name: "",
      active_code: "",
      terminal_status: "",
      device_code: "",
      devicesn: "",
      device_model: "",
      imei: "",
      mcc: "",
      pos_params_loaded: "",
      ip_address: "",
      host: "",
      terminal_type_id: "",
      retailer_id: "",
      owner_name: "",
    },
  });
  // AXIOS
  async function getRetailers() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/retailers", config);
      setRetailer(response.data);
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
    getRetailers();
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    let fileData = new FormData();
    fileData.append("location", data.location);
    fileData.append("terminal_name", data.terminal_name);
    fileData.append("active_code", data.active_code);
    fileData.append("terminal_status", data.terminal_status);
    fileData.append("device_code", data.device_code);
    fileData.append("devicesn", data.devicesn);
    fileData.append("device_model", data.device_model);
    fileData.append("imei", data.imei);
    fileData.append("mcc", data.mcc);
    fileData.append("pos_params_loaded", data.pos_params_loaded);
    fileData.append("ip_address", data.ip_address);
    fileData.append("host", data.host);
    fileData.append("terminal_type_id", data.terminal_type_id);
    fileData.append("retailer_id", data.retailer_id);
    fileData.append("owner_name", data.owner_name);
    fileData.append("term_qr_data", term_qr_data);
    try {
      const config = {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.post("/favri/terminal/add", fileData, config);
      toast.success("Терминал успешно добавлена!");
      setTimeout(() => {
        navigate("/terminal");
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
    <SmallMainScreen title={"Новый Терминал"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-6">
            <label htmlFor="terminalTypeId" className="form-label">
              Terminal Type
            </label>
            <select
              name="terminal_type_id"
              id="terminalTypeId"
              className="form-select"
              onInput={TerminalInputChange}
              {...register("terminal_type_id")}
            >
              <option value=""></option>
              {InitializeOptions.map((value) => (
                <option key={value.value} value={value.value}>
                  {value.name}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.terminal_type_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="ownerName" className="form-label">
              Owner Name
            </label>
            <input
              type="text"
              className="form-control box"
              id="ownerName"
              name="owner_name"
              placeholder="ОАО Коммерцбанк"
              {...register("owner_name")}
            />
            <ErrorMessage>{errors.owner_name?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="RetailerId" className="form-label">
              Retailer Id
            </label>
            <select
              className="form-select"
              id="RetailerId"
              name="retailer_id"
              {...register("retailer_id")}
            >
              <option value=""></option>
              {terminalId === "3" &&
                Retailers.map((item) => (
                  <option key={item.retailer_id} value={item.retailer_id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <ErrorMessage>{errors.retailer_id?.message}</ErrorMessage>
          </div>

          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control box"
              id="location"
              name="location"
              {...register("location")}
            />
            <ErrorMessage>{errors.location?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="terminalName" className="form-label">
              Terminal Name
            </label>
            <input
              type="text"
              placeholder="PCBT"
              className="form-control box"
              id="terminalName"
              name="terminal_name"
              onInput={toInputUppercase}
              {...register("terminal_name")}
            />
            <ErrorMessage>{errors.terminal_name?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="activeCode" className="form-label">
              Active Code
            </label>
            <input
              type="text"
              className="form-control box"
              id="activeCode"
              name="active_code"
              {...register("active_code")}
            />
            <ErrorMessage>{errors.active_code?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="activeCode" className="form-label">
              Terminal Status
            </label>
            <select
              name="terminal_status"
              id="activeCode"
              className="form-select"
              aria-label="Disabled select example"
              {...register("terminal_status")}
            >
              <option value={1}>Active</option>
              <option value={0}>Not Active</option>
            </select>
            <ErrorMessage>{errors.terminal_status?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="deviceCode" className="form-label">
              Device Code
            </label>
            <input
              type="text"
              className="form-control box"
              id="deviceCode"
              name="device_code"
              onInput={toInputUppercase}
              {...register("device_code")}
            />
            <ErrorMessage>{errors.device_code?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="deviceSn" className="form-label">
              Device SN
            </label>
            <input
              type="text"
              className="form-control box"
              id="deviceSn"
              name="devicesn"
              onInput={toInputUppercase}
              {...register("devicesn")}
            />
            <ErrorMessage>{errors.devicesn?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="activeModel" className="form-label">
              Device Model
            </label>
            <select
              id="activeModel"
              name="device_model"
              className="form-select"
              aria-label="Disabled select example"
              {...register("device_model")}
            >
              <option value=""></option>
              {Initialize.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ErrorMessage>{errors.device_model?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="Imei" className="form-label">
              IMEI
            </label>
            <input
              type="text"
              className="form-control box"
              id="Imei"
              name="imei"
              {...register("imei")}
            />
            <ErrorMessage> {errors.imei?.message} </ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="Mcc" className="form-label">
              MCC
            </label>
            <input
              type="text"
              className="form-control box"
              id="Mcc"
              name="mcc"
              {...register("mcc")}
            />
            <ErrorMessage> {errors.mcc?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="posParamsLoaded" className="form-label">
              Post Params Loaded
            </label>
            <select
              id="posParamsLoaded"
              name="pos_params_loaded"
              className="form-select"
              aria-label="Disabled select example"
              {...register("pos_params_loaded")}
            >
              <option value={1}>True</option>
              <option value={0}>False</option>
            </select>
            <ErrorMessage> {errors.pos_params_loaded?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="qrCode" className="form-label">
              QR Code
            </label>
            <input
              type="file"
              className="form-control box"
              id="qrCode"
              name="term_qr_data"
              onChange={(e) => setQrCodeData(e.target.files[0])}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="ipAddress" className="form-label">
              IP Address
            </label>
            <input
              type="text"
              className="form-control box"
              id="ipAddress"
              name="ip_address"
              {...register("ip_address")}
            />
            <ErrorMessage>{errors.ip_address?.message}</ErrorMessage>
          </div>

          <div className="col-md-4">
            <label htmlFor="Host" className="form-label">
              Host
            </label>
            <input
              type="text"
              className="form-control box"
              id="Host"
              name="host"
              {...register("host")}
            />
            <ErrorMessage>{errors.host?.message}</ErrorMessage>
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

export default AddKmTerminal;
