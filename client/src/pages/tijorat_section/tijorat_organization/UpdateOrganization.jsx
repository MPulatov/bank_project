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
  organization_name: "",
};

const UpdateOrganization = () => {
  const [OrganizationUpdate, setOrganizationUpdate] = useState(initialState);
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { organization_name } = OrganizationUpdate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganizationUpdate({ ...OrganizationUpdate, [name]: value });
  };

  useEffect(() => {
    async function getOrganizationById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      $host
        .get(`/favri/organization/${id}`, config)
        .then((res) => setOrganizationUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getOrganizationById();
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
        `/favri/organization/update/${id}`,
        {
          organization_name,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/organization");
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
    <SmallMainScreen title={"Изменить Организацию"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="organization" className="form-label">
              Введите название организации
            </label>
            <input
              type="text"
              className="form-control box"
              id="organization"
              name="organization_name"
              value={organization_name}
              onChange={handleInputChange}
              required
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
export default UpdateOrganization;
