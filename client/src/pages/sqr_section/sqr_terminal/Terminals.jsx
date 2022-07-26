import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { $host } from "../../../http";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";
import { ErrorMessages } from "../../../components/ErrorMessage";

const Terminals = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [Terminals, setTerminal] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  // AXIOS
  async function getTerminals() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/terminals", config);
      setTerminal(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

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
        .delete(`/terminals/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getTerminals();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  };
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Terminals.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getTerminals();
  }, []);

  return (
    <MainScreen title={"SQR: Терминал"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        {userInfo?.IsAdmin && (
          <Link to={"/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Терминал
            </Button>
          </Link>
        )}
        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TERMINALID</th>
              <th scope="col">PROVIDERID</th>
              <th scope="col">LOCALID</th>
              <th scope="col">LOCALPASSWORD</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Terminals.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.terminal_id
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.local_terminal_id
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
                  <td>{item.terminal_id}</td>
                  <td>
                    {item.name}({item.provider_id})
                  </td>
                  <td>{item.local_terminal_id}</td>
                  <td>{item.local_terminal_password}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/update/${item.id}`}>
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

export default Terminals;
