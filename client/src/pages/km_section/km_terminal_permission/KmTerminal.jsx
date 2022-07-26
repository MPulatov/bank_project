import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Pagination from "../../../components/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";

const KmTerminal = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [KmTerminals, setKmTerminal] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // AXIOS
  async function getKmTerminals() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/terminal/permission", config);
      setKmTerminal(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  useEffect(() => {
    getKmTerminals();
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  // Delete Button ---------------------------------------------------------
  const handleDeleteContent = async (id) => {
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
        .delete(`/terminal/permission/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getKmTerminals();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  };
  // Pagination --------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(KmTerminals.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <MainScreen title={"KM: Терминал Permission"}>
      <Container>
        {userInfo?.IsAdmin && (
          <Link to={"/permission/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Terminal Permission
            </Button>
          </Link>
        )}
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Transaction Code</th>
              <th scope="col">Transaction Name</th>
              <th scope="col">Terminal Name</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {KmTerminals.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.transaction_name
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.terminal_name
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.transaction_code
                  .toString()
                  .toLowerCase()
                  .includes(searching.toString().toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.terminal_allowed_tran_id}>
                  <th scope="row">{item.terminal_allowed_tran_id}</th>
                  <td>{item.transaction_code}</td>
                  <td>{item.transaction_name}</td>
                  <td>{item.terminal_name}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link
                          to={`/permission/update/${item.terminal_allowed_tran_id}`}
                        >
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() =>
                            handleDeleteContent(item.terminal_allowed_tran_id)
                          }
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

export default KmTerminal;
