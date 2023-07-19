/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/search";
import { UserContext } from "../../context/UserContext";
import "./styles.css";

export default function Header(props) {
  const navigate = useNavigate();

  const [headerStatus, setHeaderStatus] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavBar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setHeaderStatus("none");
      } else {
        setHeaderStatus("show");
      }
      setLastScrollY(window.scrollY);

      if (window.scrollY === 0) {
        setHeaderStatus("top");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavBar);
      return () => window.removeEventListener("scroll", controlNavBar);
    }
  }, [lastScrollY]);

  const { logout, user } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const CustomNavbarToggle = ({ onClick }) => (
    <img
      className="avatar"
      src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // Replace with the path to your image
      alt="Toggle Navigation"
      style={{
        width: 40,
        height: 40,
      }}
      onClick={onClick}
    />
  );

  return (
    <Navbar key={false} expand={false} className={headerStatus}>
      <Container fluid>
        <div>
          <i
            className="fa-solid fa-bars"
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={props.toggleSidebar}
          ></i>
          &nbsp; &nbsp;
          <Navbar.Brand>
            <img
              style={{ width: "40px", height: "100%" }}
              src={process.env.PUBLIC_URL + "/favicon.ico"}
            />
            <span style={{ fontWeight: "800" }}>3K Manga </span>
          </Navbar.Brand>
        </div>

        <div>
          <SearchBar placeholder="Enter a Manga Name..." />
          &nbsp; &nbsp;
          <Navbar.Toggle as={CustomNavbarToggle} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-false`}
            aria-labelledby={`offcanvasNavbarLabel-expand-false`}
            placement="end"
          >
            <Offcanvas.Header
              style={{ textAlign: "center", display: "block" }}
              closeButton
            >
              &nbsp;
              <div>
                <img
                  className="avatar"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // Replace with the path to your image
                  alt="Toggle Navigation"
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
              </div>
              &nbsp;
              {user ? (
                <Offcanvas.Title>
                  {user && user.email && <span> {user.email}</span>}
                </Offcanvas.Title>
              ) : (
                <Offcanvas.Title>GUEST</Offcanvas.Title>
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Row>
                  <Col xl={6}>
                    <Button className="mb-3 w-100" variant="outline-dark">
                      <i className="fa-solid fa-gear"></i> Settings
                    </Button>
                  </Col>
                  <Col xl={6}>
                    <Button className="mb-3 w-100" variant="outline-dark">
                      <i className="fa-solid fa-sun"></i> Theme
                    </Button>
                  </Col>
                </Row>
                {user ? (
                  <>
                    {user.roles.includes("Admin") && (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            className="mb-3 w-100"
                            variant="outline-dark"
                          >
                            <i className="fa-solid fa-list-check"></i> Manage
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="mb-3 w-100">
                            <Row className="px-2">
                              <Col>
                                <NavLink to="/manage/User">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                  >
                                    <i className="fa-solid fa-user"></i> Users
                                  </Button>
                                </NavLink>
                              </Col>
                              <Col>
                                <NavLink to="/manage/Manga">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                  >
                                    <i className="fa-solid fa-book"></i> Mangas
                                  </Button>
                                </NavLink>
                              </Col>
                            </Row>
                            <Row className="px-2 my-2">
                              <Col>
                                <NavLink to="/manage/Category">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                  >
                                    <i className="fa-solid fa-layer-group"></i>{" "}
                                    Genres
                                  </Button>
                                </NavLink>
                              </Col>
                              <Col>
                                <NavLink to="/manage/Author">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                  >
                                    <i className="fa-solid fa-compass-drafting"></i>{" "}
                                    Authors
                                  </Button>
                                </NavLink>
                              </Col>
                            </Row>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    )}
                    <Button
                      className="mb-3 w-100"
                      variant="dark"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login">
                      <Button className="mb-3 w-100" variant="dark">
                        Login
                      </Button>
                    </NavLink>
                    <NavLink to="/register">
                      <Button className="mb-3 w-100" variant="light">
                        Register
                      </Button>
                    </NavLink>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Container>
    </Navbar>
  );
}
