import { Link } from "react-router-dom";
import "./styles.css";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Button, Nav, Navbar } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { FaBars } from 'react-icons/fa';
import { ThemeContext } from "../../components/toggleTheme/themeContext";
// theme color
import "../../../src/components/toggleTheme/themeStyle.css";

import darkMode from "../../img/logo/darkMode.png"
import lightMode from "../../img/logo/lightMode.png"

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
          className={`sidebar-heading context-${theme}`}
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
          className={`sidebar-heading context-${theme}`}
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
              backgroundColor: "#2c2c2c",
            },
          } : {[`.${sidebarClasses.container}`]: {
            backgroundColor: "#FEFEFA",
          }}}
        >
          <Menu menuItemStyles={{
            label: {
              color:(theme === "dark" ? "white" : '')
            },
          }}>
            <h5 className="sidebar-title">
              <FaBars size={24} color={(theme === 'dark' ? "white" : "black")} onClick={props.toggleSidebar} />
              &nbsp; &nbsp;
              <Navbar.Brand>
              {theme === "dark" ? (
                <>
                <img
                  style={{ width: "40px", height: "100%" }}
                  src={darkMode}
                />
                </>
                ) : (
                <img
                  style={{ width: "40px", height: "100%" }}
                  src={lightMode}
                />
                )}
                {' '}
                <span className={`Brand context-${theme}`}>3K Manga</span>
              </Navbar.Brand>
            </h5>
            <MenuItem
              className={`sidebar-heading context-${theme}`}
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
