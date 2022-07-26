/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Pagination from "../../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Paginate,
  SmallContainer,
  Icons,
} from "../../../components/Style/styledComponent/StyledComponents";
import { $host } from "../../../http";
import { useSelector } from "react-redux";
import { MainScreen } from "../../../components/MainScreen/MainScreen";
import { Button, Table } from "react-bootstrap";
import { ErrorMessages } from "../../../components/ErrorMessage";
import { DownloadExcel } from "react-excel-export";

const Retailers = ({ setSearch, searching }) => {
  // FETCHING DATA
  const [Retailers, setRetailer] = useState([]);
  const [sort, setSort] = useState(15);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  // AXIOS
  async function getRetailers() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await $host.get("/retailers", config);
      setRetailer(response.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  }

  // useEffect(() => {
  //   getRetailers();
  //   if (!userInfo) {
  //     navigate("/login");
  //   }
  // }, [userInfo, navigate]);
  useEffect(() => {
    getRetailers();
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
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await $host
        .delete(`/retailers/remove/${id}`, config)
        .then(() => {
          toast.success("Cодержимое успешно удалена!");
          setTimeout(() => {
            getRetailers();
          }, 1000);
        })
        .catch((error) => setError(error.response.data.message));
    }
  };
  // Pagination ---------------------------------------------------------------------
  const [pageNumber, setPageNumber] = useState(0);
  const PrePage =
    sort === "25" ? 25 : sort === "50" ? 50 : sort === "1000" ? 1000 : sort;
  const pagesVisited = pageNumber * PrePage;
  const pageCount = Math.ceil(Retailers.length / PrePage);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <MainScreen title={"KM: Retailer"}>
      <Container>
        {userInfo?.IsAdmin && (
          <SmallContainer>
            <DownloadExcel
              data={Retailers}
              buttonLabel="Cкачать Excel"
              fileName="Ritailer_Lists"
              className="btn"
              invisible={false}
            />
            <Link to={"/retailer/add"} className="box me-3">
              <Button className="box" size="md">
                Создать Новый Retailer
              </Button>
            </Link>
          </SmallContainer>
        )}

        {error && <ErrorMessages variant="danger">{error}</ErrorMessages>}
        <Table className="box" striped bordered hover size="sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">NAME</th>
              <th scope="col">NUMBER</th>
              <th scope="col">ACTIVE</th>
              <th scope="col">DESCRIPTION</th>
              <th scope="col">EIN</th>
              <th scope="col">INN</th>
              <th scope="col">KM_RETAILER_ID</th>
              <th scope="col">RNM</th>
              {userInfo?.IsAdmin && <th scope="col-sm-1">ACTION</th>}
            </tr>
          </thead>
          <tbody>
            {Retailers.filter((item) => {
              if (setSearch === "") {
                return item;
              } else if (
                item.addres.toLowerCase().includes(searching.toLowerCase()) ||
                item.number.toLowerCase().includes(searching.toLowerCase()) ||
                item.name.toLowerCase().includes(searching.toLowerCase()) ||
                item.ein.toLowerCase().includes(searching.toLowerCase()) ||
                item.inn.toLowerCase().includes(searching.toLowerCase())
              ) {
                return item;
              }
            })
              .slice(pagesVisited, pagesVisited + PrePage)
              .map((item) => (
                <tr key={item.retailer_id}>
                  <th scope="row">{item.retailer_id}</th>
                  <td>{item.addres}</td>
                  <td>{item.name}</td>
                  <td>{item.number}</td>
                  <td>{item.active.data}</td>
                  <td>{item.description}</td>
                  <td>{item.ein}</td>
                  <td>{item.inn}</td>
                  <td>{item.km_retailerid}</td>
                  <td>{item.rnm}</td>
                  {userInfo?.IsAdmin && (
                    <td className="col-sm-1">
                      <Icons>
                        <Link to={`/retailer/update/${item.retailer_id}`}>
                          <AiOutlineEdit className="Edit box" />
                        </Link>
                        <AiOutlineDelete
                          className="Delete box"
                          onClick={() => handleDeleteContent(item.retailer_id)}
                        />
                      </Icons>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
        <Paginate>
          <div className="col-md-1">
            <label htmlFor="sort" className="form-label">
              Rows:
            </label>
            <select
              id="sort"
              className="form-select"
              aria-label="Disabled select example"
              name="sort"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={1000}>All</option>
            </select>
          </div>
          <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </Paginate>
        <ToastContainer />
      </Container>
    </MainScreen>
  );
};

export default Retailers;
