import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editManga, getLanguage } from "../../../../service/Data.service";
import { toast } from "react-toastify";

function EditManga(props) {
  const [id, setId] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [coverPath, setCoverPath] = useState(null);
  const [alternativeTitles, setAlternativeTitles] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [languageOptions, setLanguageOptions] = useState([]);
  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await getLanguage();
        setLanguageOptions(response.data);
      } catch (error) {
        console.error("Error fetching language options:", error);
      }
    };

    fetchLanguageOptions();
  }, []);

  useEffect(() => {
    if (props.show) {
      const {
        originalTitle,
        coverPath,
        alternativeTitles,
        originalLanguage,
        description,
        publishYear,
        id,
      } = props.dataEdit;
      setId(id || "");
      setOriginalTitle(originalTitle || ""); // Provide an empty string as the default value
      setCoverPath(coverPath || null);
      setAlternativeTitles(alternativeTitles || "");
      setOriginalLanguage(originalLanguage || "");
      setDescription(description || "");
      setPublishYear(publishYear || "");
    }
  }, [props.dataEdit, props.show]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("originalTitle", originalTitle);
    formData.append("coverImage", coverPath);
    formData.append("alternativeTitles", alternativeTitles);
    formData.append("originalLanguage", originalLanguage);
    formData.append("description", description);
    formData.append("publishYear", publishYear);
    console.log("Formdata", formData);

    try {
      await editManga(id, formData);
      props.handleClose();
      setOriginalTitle("");
      setCoverPath(null);
      setAlternativeTitles("");
      setOriginalLanguage("");
      setDescription("");
      setPublishYear("");
      toast.success("A manga has been updated");
      props.getMangas();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={8}>
              {" "}
              <Form.Label>Original Title</Form.Label>
              <Form.Control
                type="text"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                required
              />
            </Col>
            <Col xl={4}>
              {" "}
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPath(e.target.files[0])}
                required
              />
            </Col>
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              {" "}
              <Form.Label>Publish Year</Form.Label>
              <Form.Control
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                required
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Alternative Titles</Form.Label>
              <Form.Control
                type="text"
                value={alternativeTitles}
                onChange={(e) => setAlternativeTitles(e.target.value)}
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Original Language</Form.Label>
              <Form.Control
                as="select"
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                required
              >
                <option value="">Select Language</option>
                {languageOptions.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </Form.Control>
            </Col>{" "}
            &nbsp;
            <Row>
              <Col>
                {" "}
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditManga;
