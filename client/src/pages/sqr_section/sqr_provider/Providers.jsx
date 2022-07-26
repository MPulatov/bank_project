import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";

const Providers = ({ searching, setSearch }) => {
  const [Provider, setProvider] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");

  async function getProviders() {
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
  // useEffect(() => {
  //   getProviders();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getProviders();
  }, []);

  // Delete Button -----------------------------------------------------------------
  async function handleDeleteContent(id) {
    if (
      window.confirm(
        "Вы действительно хотите удалить это обьект без возможности восстановления?"
      )
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .delete(`/provider/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getProviders();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  }
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Provider.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title={"SQR: Провайдер"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        {userInfo?.IsAdmin && (
          <Link to={"/provider/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Провайдер
            </Button>
          </Link>
        )}

        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Провайдер</th>
              <th scope="col">Назначении платежа</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Provider.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.purpose_text
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.name.toLowerCase().includes(searching.toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.purpose_text}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/provider/update/${item.id}`}>
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() => handleDeleteContent(item.id)}
                        />
                      </Icons>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
        <Paginate>
          <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </Paginate>
        <ToastContainer />
      </Container>
    </MainScreen>
  );
};

export default Providers;
