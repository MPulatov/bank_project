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
  fullname: "",
  email: "",
  organization_id: "",
  active: true,
};

export const UserUpdate = () => {
  // Edit Button ----------------------------------------------------------
  const [userUpdate, setUserUpdate] = useState(initialState);
  const { fullname, email, organization_id, active } = userUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const { id } = useParams();
  const [organization, setOrganization] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserUpdate({ ...userUpdate, [name]: value });
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
      toast.error("Ошибка: Проверьте пожалуйста, все ли правильно!!!");
    }
  }

  useEffect(() => {
    async function getUserById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/favri/users/${id}`, config)
        .then((res) => setUserUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getUserById();
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
        `/favri/users/update/${id}`,
        {
          fullname,
          email,
          organization_id,
          active,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/user");
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
    <SmallMainScreen title={"Изменить Пользователь"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="fullname" className="form-label">
              ФИО
            </label>
            <input
              type="text"
              className="form-control box"
              id="fullname"
              name="fullname"
              value={fullname || ""}
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

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control box"
              id="email"
              name="email"
              value={email || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="active" className="form-label">
              Статус
            </label>
            <select
              name="active"
              id="active"
              className="form-select"
              aria-label="Disabled select example"
              value={active}
              onChange={handleInputChange}
            >
              <option></option>
              <option value="1">Active</option>
              <option value="0">Not Active</option>
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

export default UserUpdate;
