import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { $host } from "../../../http";

const Terminal = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [Terminal, setTerminal] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");

  // Pagination -------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Terminal.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  // AXIOS
  async function getTerminals() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/terminal", config);
      setTerminal(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  // useEffect(() => {
  //   getTerminals();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getTerminals();
  }, []);

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
        .delete(`/favri/terminal/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getTerminals();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  };

  return (
    <MainScreen title={"KM: Терминал"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        {userInfo?.IsAdmin && (
          <Link to={"/terminal/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Терминал
            </Button>
          </Link>
        )}

        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Currency</th>
              <th scope="col">Code</th>
              <th scope="col">Model</th>
              <th scope="col">Devicesn</th>
              <th scope="col">Imei</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Mcc</th>
              <th scope="col">Owner_Name</th>
              <th scope="col">Terminal Name</th>
              <th scope="col">Status</th>
              <th scope="col">Type Id</th>
              <th scope="col">Retailer_Id</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Terminal.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.terminal_name
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.device_model
                  .toLowerCase()
                  .includes(searching.toLowerCase()) ||
                item.owner_name.toLowerCase().includes(searching.toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.term_id}>
                  <th scope="row">{item.term_id}</th>
                  <td>{item.currency}</td>
                  <td>{item.device_code}</td>
                  <td>{item.device_model}</td>
                  <td>{item.devicesn}</td>
                  <td>{item.imei}</td>
                  <td>{item.km_term_name}</td>
                  <td>{item.location}</td>
                  <td>{item.mcc}</td>
                  <td>{item.owner_name}</td>
                  <td>{item.terminal_name}</td>
                  <td>{item.terminal_status}</td>
                  <td>{item.terminal_type_id}</td>
                  <td>{item.retailer_id}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/terminal/update/${item.term_id}`}>
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() => handleDeleteContent(item.term_id)}
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

export default Terminal;
