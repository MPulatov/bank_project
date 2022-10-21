import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";

const initialState = {
  currency: "",
  device_code: "",
  device_model: "",
  devicesn: "",
  imei: "",
  location: "",
  mcc: "",
  owner_name: "",
  terminal_name: "",
  terminal_status: "",
  terminal_type_id: "",
  retailer_id: "",
  ip_address: "",
  host: "",
};

const Initialize = [
  "P1N-G",
  "P1_4G-EU",
  "P1N",
  "P1_4G",
  "P1N-AMA",
  "P1_4G-AMA",
];
const InitializeOptions = [
  { id: 1, name: "Банкомат" },
  { id: 2, name: "ПВН" },
  { id: 3, name: "ПТС" },
];

const TerminalsUpdate = () => {
  const [TerminalsUpdate, setTerminalsUpdate] = useState(initialState);
  const [image, setImage] = useState("");
  const [term_qr_data, setQrCodeData] = useState(null);
  // FETCHING DATA
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const {
    device_code,
    device_model,
    devicesn,
    imei,
    location,
    mcc,
    owner_name,
    terminal_name,
    terminal_status,
    terminal_type_id,
    retailer_id,
    ip_address,
    host,
  } = TerminalsUpdate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTerminalsUpdate({ ...TerminalsUpdate, [name]: value });
  };

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  useEffect(() => {
    async function getTerminalById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/terminal/${id}`, config)
        .then((res) => setTerminalsUpdate({ ...res.data.results.data[0] }))
        .catch((error) =>
          setError(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
    }
    getTerminalById();
  }, [id]);

  useEffect(() => {
    async function getImage() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/terminal/${id}`, config)
        .then((res) => setImage(res.data.results.b64))
        .catch((error) =>
          setError(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
    }
    getImage();
  }, [id]);

  // const onChange = (e) => {
  //   const files = e.target.files;
  //   const file = files[0];
  //   getbase64(file);
  // };

  // const getbase64 = (file) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setQrCodeData(reader.result);
  //   };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileData = new FormData();
    fileData.append("location", location);
    fileData.append("terminal_name", terminal_name);
    fileData.append("terminal_status", terminal_status);
    fileData.append("device_code", device_code);
    fileData.append("devicesn", devicesn);
    fileData.append("device_model", device_model);
    fileData.append("imei", imei);
    fileData.append("mcc", mcc);
    fileData.append("ip_address", ip_address);
    fileData.append("host", host);
    fileData.append("terminal_type_id", terminal_type_id);
    fileData.append("retailer_id", retailer_id);
    fileData.append("owner_name", owner_name);
    fileData.append("term_qr_data", term_qr_data);
    try {
      const config = {
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host.patch(`/favri/terminal/update/${id}`, fileData, config);
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/terminal");
      }, 1000);
    } catch (error) {
      if (error.response) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(message);
        toast.error("Ошибка: Проверьте пожалуйста, все ли правильно!!!");
      }
    }
  };

  return (
    <SmallMainScreen title={"Изменить KM Терминал"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="terId" className="form-label">
              Terminal Type
            </label>
            <select
              value={terminal_type_id}
              onChange={handleInputChange}
              name="terminal_type_id"
              id="terId"
              className="form-select"
              aria-label="Default select example"
              required
            >
              <option value=""></option>
              {InitializeOptions.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
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
              onChange={handleInputChange}
              value={owner_name}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="RetailerId" className="form-label">
              Retailer Id
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              value={retailer_id || ""}
              name="retailer_id"
              id="RetailerId"
              className="form-control box"
              disabled
            />
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
              value={location}
              onChange={handleInputChange}
              required
            />
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
              value={terminal_name}
              onInput={toInputUppercase}
              onChange={handleInputChange}
              required
            />
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
              value={device_code}
              onInput={toInputUppercase}
              onChange={handleInputChange}
              required
            />
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
              onChange={handleInputChange}
              value={devicesn}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="activeCode" className="form-label">
              Terminal Status
            </label>
            <select
              name="terminal_status"
              id="activeCode"
              className="form-select"
              aria-label="Disabled select example"
              value={terminal_status}
              onChange={handleInputChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Not Active</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="activeModel" className="form-label">
              Device Model
            </label>
            <select
              id="activeModel"
              name="device_model"
              className="form-select"
              aria-label="Disabled select example"
              value={device_model}
              onChange={handleInputChange}
              required
            >
              <option value=""></option>
              {Initialize.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="Imei" className="form-label">
              IMEI
            </label>
            <input
              type="text"
              className="form-control box"
              id="Imei"
              name="imei"
              value={imei}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="Mcc" className="form-label">
              MCC
            </label>
            <input
              type="text"
              className="form-control box"
              id="Mcc"
              name="mcc"
              value={mcc}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="ipAddress" className="form-label">
              IP Address
            </label>
            <input
              type="text"
              className="form-control box"
              id="ipAddress"
              name="ip_address"
              value={ip_address}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="Host" className="form-label">
              Host
            </label>
            <input
              type="text"
              className="form-control box"
              id="Host"
              name="host"
              value={host}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="term_qr_data" className="form-label">
              QR Code
            </label>
            <input
              type="file"
              className="form-control box"
              id="term_qr_data"
              name="term_qr_data"
              onChange={(e) => setQrCodeData(e.target.files[0])}
              required
            />
            {image === "" ? (
              ""
            ) : (
              <img src={`data:image/jpeg;base64, ${image}`} alt="QR Code" />
            )}
            {/* <textarea value={term_qr_data} id="" cols="30" rows="10"></textarea> */}
          </div>

          <div className="col-12 d-flex justify-content-end">
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

export default TerminalsUpdate;
