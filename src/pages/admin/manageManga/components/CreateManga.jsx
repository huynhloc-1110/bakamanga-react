import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  createManga,
  getLanguage,
  getCategory,
  getAuthor,
} from "../../../../service/Data.service";
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function CreateManga(props) {
  const [originalTitle, setOriginalTitle] = useState("");
  const [coverPath, setCoverPath] = useState(null);
  const [alternativeTitles, setAlternativeTitles] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [author, setAuthor] = useState([]);
  const [publishYear, setPublishYear] = useState("");

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("originalTitle", originalTitle);
    formData.append("coverImage", coverPath);
    formData.append("alternativeTitles", alternativeTitles);
    formData.append("originalLanguage", originalLanguage);
    formData.append("description", description);
    formData.append("categoryIds", categoryIds);
    formData.append("author", author);
    formData.append("publishYear", publishYear);

    try {
      await createManga(formData);
      props.handleClose();
      setOriginalTitle("");
      setCoverPath(null);
      setAlternativeTitles("");
      setOriginalLanguage("");
      setDescription("");
      setCategoryIds("");
      setAuthor("");
      setPublishYear("");
      toast.success("A manga has been created");
      props.getMangas();
    } catch (error) {
      toast.error(error);
    }
  };

  //hanlde seleted language
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

  //hanlde seleted categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    try {
      const result = await getCategory(30);
      setCategories(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const animatedComponents = makeAnimated();

  console.log(categoryIds);

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Manga</Modal.Title>
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
              <Form.Label>Category</Form.Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={categoryOptions}
                onChange={(selectedOptions) => {
                  const categoryIds = selectedOptions.map(
                    (option) => option.value
                  );
                  setCategoryIds(categoryIds);
                  console.log("asd");
                }}
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
              <Form.Select
                as="select"
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                required
              >
                <option>Select Language</option>
                {languageOptions.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </Form.Select>
            </Col>{" "}
            &nbsp;
          </Row>{" "}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSave}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateManga;
