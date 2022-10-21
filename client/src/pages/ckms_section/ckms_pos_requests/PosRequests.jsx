import React, { useState, useEffect } from "react";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";
import { ErrorMessages } from "../../../components/ErrorMessage";

const PosRequests = ({ setSearch, searching }) => {
  const [posRequests, setPosRequests] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");

  async function getPosRequests() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/posrequests", config);
      setPosRequests(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }
  // useEffect(() => {
  //   getPosRequests();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [navigate, userInfo]);
  useEffect(() => {
    getPosRequests();
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
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .delete(`/posrequests/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getPosRequests();
          }, 1000);
        })
        .catch((err) => setError(err.response.data.message));
    }
  }
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(posRequests.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title="CKMS: Идентификаторы Терминала">
      <Container>
        {userInfo?.IsAdmin && (
          <Link to={"/posrequests/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Идентификаторы Терминала
            </Button>
          </Link>
        )}
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Терм СН</th>
              <th scope="col">Терм ИНН</th>
              <th scope="col">Терм ЭЙН</th>
              <th scope="col">Терм РНМ</th>
              <th scope="col">Терм ИМЭЙ</th>
              <th scope="col">Отп Код</th>
              <th scope="col">Статус</th>
              <th scope="col">Переданный</th>
              <th scope="col">Создан</th>
              {userInfo?.IsAdmin && <th scope="col">Действие</th>}
            </tr>
          </thead>
          <tbody>
            {posRequests
              .filter((item) => {
                if (setSearch === "") {
                  return item;
                } else if (
                  item.term_inn
                    .toString()
                    .toLowerCase()
                    .includes(searching.toString().toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.term_sn}</td>
                  <td>{item.term_inn}</td>
                  <td>{item.term_ein}</td>
                  <td>{item.term_rnm}</td>
                  <td>{item.term_imei}</td>
                  <td>{item.otp_code}</td>
                  <td>{item.active}</td>
                  <td>{item.transmitted}</td>
                  <td>{moment(item.created_at).format("llll")}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/transfer/key/${item.id}`}>
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

export default PosRequests;
