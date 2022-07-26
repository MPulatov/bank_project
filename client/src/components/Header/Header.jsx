import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../Redux/actions/userActions";
import { FaRegUserCircle } from "react-icons/fa";

export const Header = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHeandler = () => {
    dispatch(logout());
    if (!userInfo) {
      navigate("/login");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand>
          {userInfo?.IsAdmin === true
            ? "Админ"
            : userInfo?.IsAdmin === false
            ? "Пользователь"
            : ""}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Form>
            )}
          </Nav>

          <Nav className="mr-auto">
            {userInfo ? (
              <>
                <NavDropdown
                  title={<FaRegUserCircle size={26} color="white" />}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logoutHeandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Link to="/login">
                <FaRegUserCircle size={26} color="white" />
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
