import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

export const SideBar = ({ setSearch }) => {
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  function handleOnClick() {
    setSearch("");
  }

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo">...</div>
        <ul className="sidebar-navigation">
          <li className="header">KM</li>

          <li className={splitLocation[1] === "retailer" ? "active" : ""}>
            <Link to="/retailer" onClick={handleOnClick}>
              Retailer
            </Link>
          </li>

          <li className={splitLocation[1] === "terminal" ? "active" : ""}>
            <Link to="/terminal" onClick={handleOnClick}>
              Терминал
            </Link>
          </li>

          <li className={splitLocation[1] === "permission" ? "active" : ""}>
            <Link to="/permission" onClick={handleOnClick}>
              Терминал Permission
            </Link>
          </li>

          <li className="header">SQR</li>
          <li className={splitLocation[1] === "provider" ? "active" : ""}>
            <Link to="/provider" onClick={handleOnClick}>
              Провайдер
            </Link>
          </li>

          <li className={splitLocation[1] === "" ? "active" : ""}>
            <Link to="/" onClick={handleOnClick}>
              Терминал
            </Link>
          </li>

          <li className="header">CKMS</li>
          {/* <li className={splitLocation[1] === "posrequests" ? "active" : ""}>
            <Link to="/posrequests">Идентификаторы Терминала</Link>
          </li> */}
          <li className={splitLocation[1] === "posrequests" ? "active" : ""}>
            <Link to="/posrequests" onClick={handleOnClick}>
              Запрос Передачи Ключей
            </Link>
          </li>

          <li className="header">TIJORAT</li>
          <li className={splitLocation[1] === "organization" ? "active" : ""}>
            <Link to="/organization" onClick={handleOnClick}>
              Организация
            </Link>
          </li>
          <li className={splitLocation[1] === "user" ? "active" : ""}>
            <Link to="/user" onClick={handleOnClick}>
              Пользователя
            </Link>
          </li>

          <li className={splitLocation[1] === "sale" ? "active" : ""}>
            <Link to="/sale" onClick={handleOnClick}>
              Точки Продаж
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className="content-container">
        <div className="container-fluid">
          <!-- Main component for a primary marketing message or call to action -->
          <div className="jumbotron">
            <h1>Navbar example</h1>
            <p>
              This example is a quick exercise to illustrate how the default,
              static and fixed to top navbar work. It includes the responsive
              CSS and HTML, so it also adapts to your viewport and device.
            </p>
            <p>
              To see the difference between static and fixed top navbars, just
              scroll.
            </p>
            <p>
              <Link className="btn btn-lg btn-primary" to="/" role="button">
                View navbar docs &raquo;
              </Link>
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};
