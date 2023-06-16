import React, { useState, useContext } from "react";
import "./styles.css";
import { Button, Image, Modal, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../components/toggleTheme/themeContext";
// theme color
import "../../../src/components/toggleTheme/themeStyle.css";

function SearchBar({ placeholder, data }) {
  const { theme } = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      const originalTitle = value.originalTitle
        ? value.originalTitle.toLowerCase()
        : "";
      const alternativeTitles = value.alternativeTitles
        ? value.alternativeTitles.toLowerCase()
        : "";
      return (
        originalTitle.includes(searchWord.toLowerCase()) ||
        alternativeTitles.includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
      <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} onClick={handleShow}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="search">
            <div className="searchInputs">
              <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
              />
              {filteredData.length === 0 ? (
                <p></p>
              ) : (
                <Button variant="outline-dark" onClick={clearInput}>
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              )}
            </div>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Nav.Link
                        href={`/Manga/${value.id}`}
                        className="dataItem"
                      >
                        <Image
                          style={{ height: "60px", width: "40px" }}
                          src={value.coverPath}
                        />
                        <p>{value.originalTitle} </p>
                      </Nav.Link>
                      <hr />
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SearchBar;
