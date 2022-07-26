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
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";
import { ErrorMessages } from "../../../components/ErrorMessage";

const Organization = ({ setSearch, searching }) => {
  const [organization, setOrganization] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");

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
  // useEffect(() => {
  //   getOrganization();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getOrganization();
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
        .delete(`/favri/organization/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getOrganization();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  }
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(organization.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title={"TIJORAT: Организация"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        {userInfo?.IsAdmin && (
          <Link to={"/organization/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Организацию
            </Button>
          </Link>
        )}

        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ORGANIZATION</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {organization
              .filter((item) => {
                if (setSearch === "") {
                  return item;
                } else if (
                  item.organization_name
                    .toLowerCase()
                    .includes(searching.toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.organization_name}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/organization/update/${item.id}`}>
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

export default Organization;
