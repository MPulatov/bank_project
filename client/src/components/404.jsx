import React from "react";
import { Link } from "react-router-dom";
import { MainScreen } from "./MainScreen/MainScreen";

const NotFound = () => {
  return (
    <MainScreen title={"Page Not Found 404"}>
      <Link className="box" to="/terminal">
        GO BACK
      </Link>
    </MainScreen>
  );
};

export default NotFound;
