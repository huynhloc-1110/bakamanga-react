import { Link } from "react-router-dom";
import "./styles.css";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Nav, Navbar } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../components/toggleTheme/themeContext";
// theme color
import "../../../src/components/toggleTheme/themeStyle.css";

function SideBar(props) {
  const { theme } = useContext(ThemeContext);
  const [dropdownStates, setDropdownStates] = useState({
    browsing: true,
    followes: true,
  });

  const handleDropdownClick = (section) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const menuItems = [
    {
      section: "browsing",
      heading: (
        <MenuItem
          className="sidebar-heading"
          onClick={() => handleDropdownClick("browsing")}
          key="browsing-heading"
        >
          <i className="fa-solid fa-book-open"></i> &nbsp; Browsing
        </MenuItem>
      ),
      items: [
        { text: "Popular", to: "/Manga/popular", key: "popular" },
        {
          text: "Latest Manga",
          to: "/Manga/latest-manga",
          key: "latest-manga",
        },
        {
          text: "Latest Chapter",
          to: "/Manga/latest-chapter",
          key: "latest-chapter",
        },
        { text: "Random", to: "/Manga/random", key: "random" },
      ],
    },
    {
      section: "followes",
      heading: (
        <MenuItem
          className="sidebar-heading"
          onClick={() => handleDropdownClick("followes")}
          key="followes-heading"
        >
          <i className="fa-solid fa-bookmark"></i> &nbsp; Followes
        </MenuItem>
      ),
      items: [
        {
          text: "Followed Manga",
          to: "/followed-manga",
          key: "followed-manga",
        },
        { text: "Followed User", to: "/followed-user", key: "followed-user" },
        { text: "Community Feeds", to: "/community", key: "community-feeds" },
      ],
    },
  ];

  return (
    <>
      <Nav className={`nav-menu`}>
        <Sidebar
          rootStyles={theme === "dark" ? {
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#555555",
            },
          } : {[`.${sidebarClasses.container}`]: {
            backgroundColor: "#FEFEFA",
          }}}
        >
          <Menu>
            <h5 className="sidebar-title">
              <i className="fa-solid fa-bars" onClick={props.toggleSidebar}></i>
              &nbsp; &nbsp;
              <Navbar.Brand>
                <img
                  style={{ width: "40px", height: "100%" }}
                  src={process.env.PUBLIC_URL + "/favicon.ico"}
                />{" "}
                3K Manga{" "}
              </Navbar.Brand>
            </h5>
            <MenuItem
              className="sidebar-heading"
              component={<Link to="/" />}
              key="home"
            >
              <i className="fa-solid fa-house"></i> &nbsp; Home
            </MenuItem>
            <hr className="sidebar-divider" />
            {menuItems.map((menuItem) => (
              <React.Fragment key={menuItem.section}>
                {menuItem.heading}
                {menuItem.items.map((item, key) => (
                  <MenuItem
                    key={item.key}
                    className={`nav-text dropdown-item${
                      dropdownStates[menuItem.section] ? " active" : ""
                    }`}
                    component={<Link to={item.to} />}
                  >
                    {item.text}
                  </MenuItem>
                ))}
                <hr className="sidebar-divider" />
              </React.Fragment>
            ))}
          </Menu>
        </Sidebar>
      </Nav>
    </>
  );
}

export default SideBar;
