/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Paginate,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";
import { ErrorMessages } from "../../../components/ErrorMessage";

const Users = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [Users, setUser] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  // AXIOS
  async function getUsers() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/users", config);
      setUser(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }
  // useEffect(() => {
  //   getUsers();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getUsers();
  }, []);
  // Delete Button ---------------------------------------------------------
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
        .delete(`/favri/users/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getUsers();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  }
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Users.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title={"TIJORAT: Пользователь"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        {userInfo?.IsAdmin && (
          <Link to={"/user/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Пользователя
            </Button>
          </Link>
        )}
        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">FULLNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ORGANIZATION NAME</th>
              <th scope="col">ACTIVE</th>
              <th scope="col">CREATED TIME</th>
              {userInfo?.IsAdmin && <th scope="col-sm-2">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Users.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.fullname.toLowerCase().includes(searching.toLowerCase()) ||
                item.email.toLowerCase().includes(searching.toLowerCase()) ||
                item.organization_name
                  .toLowerCase()
                  .includes(searching.toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.organization_name}({user.organization_id})
                  </td>
                  <td>{user.active}</td>
                  <td>{moment(user.created_time).format("llll")}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-2">
                      <Icons>
                        <Link to={`/user/update/${user.id}`}>
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() => handleDeleteContent(user.id)}
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

export default Users;
