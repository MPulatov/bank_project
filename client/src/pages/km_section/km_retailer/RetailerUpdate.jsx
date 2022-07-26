import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { SmallMainScreen } from "../../../components/MainScreen/MainScreen";

const initialState = {
  addres: "",
  name: "",
  number: "",
  active: "",
  description: "",
  ein: "",
  inn: "",
  km_retailerid: "",
  rnm: "",
};

const RetailerUpdate = () => {
  const [retailersUpdate, setRetailersUpdate] = useState(initialState);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRetailersUpdate({ ...retailersUpdate, [name]: value });
  };

  const {
    name,
    addres,
    number,
    active,
    description,
    ein,
    inn,
    km_retailerid,
    rnm,
  } = retailersUpdate;

  useEffect(() => {
    async function getRetailerById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/retailers/${id}`, config)
        .then((res) => setRetailersUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getRetailerById();
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
        `/retailers/update/${id}`,
        {
          name,
          addres,
          number,
          active,
          description,
          ein,
          inn,
          km_retailerid,
          rnm,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
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

  return (
    <SmallMainScreen title={"Изменить Retailer"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              NAME
            </label>
            <input
              type="text"
              className="form-control box"
              id="name"
              name="name"
              value={name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="number" className="form-label">
              NUMBER
            </label>
            <input
              type="text"
              className="form-control box"
              id="number"
              name="number"
              value={number || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addres">ADDRESS</label>
            <input
              type="address"
              className="form-control box"
              id="addres"
              name="addres"
              value={addres || ""}
              placeholder="Rudaki 0/1"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="ein" className="form-label">
              EIN
            </label>
            <input
              type="text"
              className="form-control box"
              id="ein"
              name="ein"
              value={ein || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className=" form-group col-md-4">
            <label htmlFor="inn" className="form-label">
              INN
            </label>
            <input
              type="text"
              className="form-control box"
              id="inn"
              name="inn"
              value={inn || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="rnm" className="form-label">
              RNM
            </label>
            <input
              type="text"
              className="form-control box"
              id="rnm"
              name="rnm"
              value={rnm || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="km_retailerid" className="form-label">
              KM_RETAILER_ID
            </label>
            <input
              type="text"
              className="form-control box"
              id="km_retailerid"
              name="km_retailerid"
              value={km_retailerid || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="active" className="form-label">
              ACTIVE
            </label>
            <input
              type="text"
              className="form-control box"
              id="active"
              name="active.data"
              value={active.data || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">DESCRIPTION</label>
            <textarea
              className="form-control box"
              id="description"
              name="description"
              value={description || ""}
              onChange={handleInputChange}
            />
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

export default RetailerUpdate;
