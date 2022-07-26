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
  name: "",
  organization_id: "",
};

export const SaleUpdate = () => {
  // Edit Button ----------------------------------------------------------
  const [SaleUpdate, setSaleUpdate] = useState(initialState);
  const { name, organization_id } = SaleUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [organization, setOrganization] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSaleUpdate({ ...SaleUpdate, [name]: value });
  };

  async function getOrganization() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/organization", config);
      setOrganization(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  useEffect(() => {
    async function getSaleById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/sales/${id}`, config)
        .then((res) => setSaleUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getSaleById();
    getOrganization();
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
        `/favri/sales/update/${id}`,
        {
          name,
          organization_id,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/sale");
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
    <SmallMainScreen title={"Изменить Точки продаж"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              type="text"
              className="form-control box"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="organization_name" className="form-label">
              Имя организации
            </label>
            <select
              name="organization_id"
              id="organization_name"
              className="form-select"
              aria-label="Disabled select example"
              value={organization_id}
              onChange={handleInputChange}
            >
              <option></option>
              {organization.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.organization_name}
                </option>
              ))}
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

export default SaleUpdate;
