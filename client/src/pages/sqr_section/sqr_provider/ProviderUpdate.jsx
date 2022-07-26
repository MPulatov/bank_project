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
  name: "",
  purpose_text: "",
};

const ProviderUpdate = () => {
  const [ProviderUpdate, setProviderUpdate] = useState(initialState);
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { name, purpose_text } = ProviderUpdate;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProviderUpdate({ ...ProviderUpdate, [name]: value });
  };

  useEffect(() => {
    async function getProviderById() {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .get(`/provider/${id}`, config)
        .then((res) => setProviderUpdate({ ...res.data[0] }))
        .catch((error) => setError(error.response.data.message));
    }
    getProviderById();
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
        `/provider/update/${id}`,
        {
          name,
          purpose_text,
        },
        config
      );
      toast.success("Cодержимое успешно обновлена!");
      setTimeout(() => {
        navigate("/provider");
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
    <SmallMainScreen title={"Изменить Провайдер"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="providerName" className="form-label">
              Имя провайдера
            </label>
            <input
              type="text"
              className="form-control box"
              id="providerName"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="providerPurposeText" className="form-label">
              Текст в назначении платежа
            </label>
            <input
              type="text"
              className="form-control box"
              id="providerPurposeText"
              name="purpose_text"
              value={purpose_text}
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
export default ProviderUpdate;
