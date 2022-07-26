import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

export const SideBar = () => {
  //assigning location variable
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo"></div>
        <ul className="sidebar-navigation">
          <li className="header">KM</li>

          <li className={splitLocation[1] === "retailer" ? "active" : ""}>
            <Link to="/retailer">Retailer</Link>
          </li>

          <li className={splitLocation[1] === "terminal" ? "active" : ""}>
            <Link to="/terminal">Терминал</Link>
          </li>

          <li className={splitLocation[1] === "permission" ? "active" : ""}>
            <Link to="/permission">Terminal Permission</Link>
          </li>

          <li className="header">SQR</li>
          <li className={splitLocation[1] === "provider" ? "active" : ""}>
            <Link to="/provider">Провайдер</Link>
          </li>

          <li className={splitLocation[1] === "" ? "active" : ""}>
            <Link to="/">Терминал</Link>
          </li>

          <li className="header">CKMS</li>
          {/* <li className={splitLocation[1] === "posrequests" ? "active" : ""}>
            <Link to="/posrequests">Идентификаторы Терминала</Link>
          </li> */}
          <li className={splitLocation[1] === "posrequests" ? "active" : ""}>
            <Link to="/posrequests">Запрос Передачи Ключей</Link>
          </li>

          <li className="header">TIJORAT</li>
          <li className={splitLocation[1] === "organization" ? "active" : ""}>
            <Link to="/organization">Организация</Link>
          </li>
          <li className={splitLocation[1] === "user" ? "active" : ""}>
            <Link to="/user">Пользователя</Link>
          </li>

          <li className={splitLocation[1] === "sale" ? "active" : ""}>
            <Link to="/sale">Точки Продаж</Link>
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
