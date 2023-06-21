import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteCategory } from "../../../../service/Data.service";
import { toast } from "react-toastify";

function DeleteCate(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.show) {
      setId(props.dataEdit.id || "");
      setName(props.dataEdit.name || "");
    }
  }, [props.dataEdit, props.show]);

  console.log("id dELETE", id);
  const handleConfirm = async () => {
    try {
      await deleteCategory(id);
      toast.success("Category has been deleted", {
        theme: "dark",
      });
      props.getCategories();
      props.handleClose();
    } catch (error) {
      toast.error("Failed to delete manga");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>Original Title</Form.Label>
              <Form.Control type="text" defaultValue={name} readOnly />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteCate;