import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

export default function MangaList() {
  const [show, setShow] = useState(false);
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <div className="create-manga-list" onClick={() => setShow(true)}>
            <p style={{ margin: "auto", textAlign: "center" }}>
              <i className="fa-solid fa-plus"></i> Create new Manga List
            </p>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "40%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "30%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "20%" }}
                alt="mangaList's cover"
              ></img>
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
              <div className="hover-overlay">
                <span>See more</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "40%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "30%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "20%" }}
                alt="mangaList's cover"
              ></img>
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
              <div className="hover-overlay">
                <span>See more</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="manga-list">
            <div>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "40%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "30%" }}
                alt="mangaList's cover"
              ></img>
              <img
                src="/img/error/coverNotFound.png"
                style={{ width: "20%" }}
                alt="mangaList's cover"
              ></img>
              <div className="manga-list-info">
                <i className="fa-solid fa-list-ul icon"></i>
                <p className="manga-list-name text-limit-2">Manga List Name</p>
              </div>
              <div className="hover-overlay">
                <span>See more</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Manga List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Privacy</Form.Label>
              <Form.Select>
                <option>Private</option>
                <option>Public</option>
              </Form.Select>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="success"
                onClick={() => {
                  setShow(false);
                }}
              >
                Create
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
