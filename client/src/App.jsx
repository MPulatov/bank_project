import { BrowserRouter as Router } from "react-router-dom";
import { useState, Suspense } from "react";
import { SideBar } from "./components/Sidebar/SideBar";
import { Header } from "./components/Header/Header";
import { useSelector } from "react-redux";
import { AllRoutes } from "./components/Routes";
import "./components/Style/bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

const App = () => {
  const [Searching, setSearch] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Header setSearch={setSearch} />
      {userInfo && <SideBar />}
      <div className="content-container t-50px">
        <div className="container-fluid">
          <Suspense
            fallback={
              <div className="flex-center center box">
                Подождите, идёт загрузка...
              </div>
            }
          >
            <AllRoutes Searching={Searching} setSearch={setSearch} />
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App;
