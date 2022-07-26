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

const Sales = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [Sales, setSale] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  // AXIOS
  async function getSales() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/favri/sales", config);
      setSale(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }
  // useEffect(() => {
  //   getSales();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getSales();
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
        .delete(`/favri/sales/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getSales();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  };
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage = 20;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Sales.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title={"TIJORAT: Точки Продаж"}>
      <Container>
        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}

        {userInfo?.IsAdmin && (
          <Link to={"/sale/add"} className="d-flex justify-content-end">
            <Button className="box mb-3" size="md">
              Создать Новый Точки Продаж
            </Button>
          </Link>
        )}

        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">ORGANIZATION NAME</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Sales.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searching.toLowerCase()) ||
                item.organization_name
                  .toLowerCase()
                  .includes(searching.toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((sale) => (
                <tr key={sale.id}>
                  <th scope="row">{sale.id}</th>
                  <td>{sale.name}</td>
                  <td>
                    {sale.organization_name}({sale.organization_id})
                  </td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/sale/update/${sale.id}`}>
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() => handleDeleteContent(sale.id)}
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

export default Sales;
