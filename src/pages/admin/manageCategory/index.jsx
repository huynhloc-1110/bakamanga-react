import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../../context/UserContext";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCategoryList,
  getCategoryByID,
} from "../../../service/Data.service";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../../../components/pagination";
import CreateCate from "./components/CreateCate";
import EditCate from "./components/EditCate";
import DeleteCate from "./components/DeleteCate";
import { Col, Row, Form } from "react-bootstrap";

function ManageCategory() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [dataEdit, setDataEdit] = useState({});

  // Set page and search term from URL search params
  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  // Fetch manga data
  useEffect(() => {
    getCategories();
  }, [searchTerm, page]);

  const getCategories = async () => {
    try {
      const result = await getCategoryList(searchTerm, page);
      setCategories(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        // Handle other errors
        setCategories([]);
        setTotalPages(0);
      }
    }
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ search, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  };
  const handleEdit = async (id) => {
    handleShowEdit();
    await getCategoryByID(id).then((result) => {
      setDataEdit(result.data);
    });
  };

  // Event handler for deleting cate
  const handleDelete = (categories) => {
    setDataEdit(categories);
    handleShowDelete();
  };

  return (
    <div className="manage-manga">
      <ToastContainer />
      <div className="manage-table">
        <Row>
          <Col>
            <Button variant="success" onClick={handleShowCreate}>
              <i className="fa-solid fa-circle-plus"></i> Create
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>
        &nbsp;
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="description-cell">{item.description}</td>
                    <td colSpan={2}>
                      <Button onClick={() => handleEdit(item.id)}>
                        {" "}
                        <i className="fa-solid fa-pen-to-square"></i> Edit{" "}
                      </Button>
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item)}
                      >
                        {" "}
                        <i className="fa-solid fa-trash"></i> Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="text-center">No data found.</div>
            )}
          </tbody>
        </Table>
        &nbsp;
        <div className="d-flex justify-content-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            setSearchParams={setSearchParams}
            search={searchTerm}
          />
        </div>
        <CreateCate
          show={showCreate}
          handleClose={handleCloseCreate}
          getCategories={getCategories}
        />
        <EditCate
          show={showEdit}
          handleClose={handleCloseEdit}
          dataEdit={dataEdit}
          getCategories={getCategories}
        />
        <DeleteCate
          show={showDelete}
          handleClose={handleCloseDelete}
          dataEdit={dataEdit}
          getCategories={getCategories}
        />
      </div>
    </div>
  );
}

export default ManageCategory;