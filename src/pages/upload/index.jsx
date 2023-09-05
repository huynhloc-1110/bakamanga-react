import { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as mangaApi from "../../service/api.manga";
import * as chapterApi from "../../service/api.chapter";
import { LanguageContext } from "../../context/LanguageContext";
import "./styles.css";

export default function Upload() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { mangaId } = useParams();
  const { languageOptions } = useContext(LanguageContext);

  const [manga, setManga] = useState();
  const [groups, setGroups] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Map groups to options format for the Select component
  const groupOptions = groups?.map((group) => ({
    value: group.id,
    label: group.name,
  }));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages([...selectedImages, ...files]);
    }

    // Clear input so that the next image change will trigger the event
    e.target.value = null;
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  //handle drag and drop event
  const handleDragOver = (index) => {
    if (draggedIndex === null || index === draggedIndex) {
      return;
    }
    const updatedImages = [...selectedImages];
    const [draggedImage] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, draggedImage);
    setSelectedImages(updatedImages);
    setDraggedIndex(index);
  };

  const onSubmit = async (data) => {
    if (!selectedImages.length) {
      return toast.error("Please select at least one image.");
    }

    const formData = buildFormData(data);
    try {
      await chapterApi.uploadChapter(formData);
      resetForm();
      toast.success("A Chapter has been created");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const buildFormData = (data) => {
    const formData = new FormData();
    selectedImages.forEach((image) => formData.append("pages", image));

    for (const key in data) {
      if (key === "uploadingGroupId" || key === "language") {
        formData.append(key, data[key].value);
      } else {
        formData.append(key, data[key]);
      }
    }

    formData.append("mangaId", mangaId);
    return formData;
  };

  const resetForm = () => {
    fileInputRef.current.value = null;
    setSelectedImages([]);
    setDraggedIndex(null);
    reset({
      uploadingGroupId: null,
      number: "",
      name: "",
      language: null,
    });
  };

  useEffect(() => {
    const fetchMangaAndGroups = async () => {
      await getMangaDetail(mangaId);
      await getUserGroups();
    };

    fetchMangaAndGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId]);

  const getUserGroups = async () => {
    try {
      const result = await chapterApi.getUploadGroup();
      setGroups(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMangaDetail = async (id) => {
    try {
      const result = await mangaApi.getMangaById(id);
      setManga(result.data);
      document.title = `Upload - ${result.data.originalTitle} - 3K Manga`;
    } catch (error) {
      if (error.response?.status === 404) {
        navigate("/404");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <Link to={`/manga/${mangaId}`}>
          <button className="return-button">
            <span>
              <i className="fa-solid fa-arrow-left"></i>
            </span>
          </button>
        </Link>{" "}
        Upload Chapter
      </div>
      &nbsp;
      <Container fluid>
        <Card className="uploader-card">
          <Row>
            <Col xs={4} md={2} xl={1}>
              {manga ? (
                <Card.Img
                  src={manga.coverPath || "/img/error/coverNotFound.png"}
                  alt="Manga Cover"
                  className="coverPath"
                />
              ) : (
                <p>Cover not found.</p>
              )}
            </Col>
            <Col xs={8} md={9} xl={10} style={{ padding: "15px" }}>
              {manga ? (
                <>
                  <Card.Title className="text-limit-1">
                    <b>{manga.originalTitle}</b>
                  </Card.Title>
                  <Card.Text className="manga-category text-limit-2">
                    {manga.categories.map((c) => (
                      <Link
                        to={`/manga?included=${c.id.substring(0, 5)}`}
                        className="btn-pill clickable"
                        key={c.id}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </Card.Text>
                </>
              ) : (
                <p>Manga not found.</p>
              )}
            </Col>
          </Row>
        </Card>
        &nbsp;
        <Form id="upload-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="mb-3">
              <Form.Label>
                Group{" "}
                {errors.uploadingGroupId && (
                  <i
                    title={errors.uploadingGroupId.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Controller
                name="uploadingGroupId"
                defaultValue={null}
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} isClearable options={groupOptions} />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Chapter number{" "}
                {errors.number && (
                  <i
                    title={errors.number.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Number"
                aria-label="Chapter number"
                min={"0"}
                {...register("number", {
                  required: "Chapter number is required",
                })}
              />
            </Col>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Chapter name{" "}
                {errors.name && (
                  <i
                    title={errors.name.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                aria-label="Chapter name"
                {...register("name", {
                  required: "Chapter number is required",
                })}
              />
            </Col>
            <Col md={4} lg={4} className="mb-3">
              <Form.Label>
                Choose language{" "}
                {errors.language && (
                  <i
                    title={errors.language.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Controller
                defaultValue={null}
                name="language"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select {...field} isClearable options={languageOptions} />
                )}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label>Pages</Form.Label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              multiple
            />
            <div className="image-container justify-left flex-wrap mb-4">
              {selectedImages.map((image, index) => (
                <div
                  key={image.name}
                  className={`pages-upload-card flex-grow-0 ${
                    draggedIndex === index ? "dragging" : ""
                  }`}
                  draggable="true"
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={() => handleDragOver(index)}
                  onDragEnd={() => setDraggedIndex(null)}
                >
                  <img
                    className="image"
                    src={URL.createObjectURL(image)}
                    alt="pages"
                    draggable="false"
                  />
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleImageDelete(index)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <button type="button" className="drag-button">
                    <i className="fa-solid fa-arrows-up-down-left-right"></i>
                  </button>
                  <div className="image-label">{image.name}</div>
                </div>
              ))}
              <div className="input-pages" onClick={handleFileInputClick}>
                <i className="fa-solid fa-plus" />
              </div>
            </div>
            {selectedImages.length > 0 ? (
              <div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setSelectedImages([])}
                >
                  Remove all pages
                </button>
              </div>
            ) : (
              <></>
            )}
          </Row>
        </Form>
        <Row>
          <Col className="d-flex justify-content-end">
            <button
              type="submit"
              form="upload-form"
              className="new-to-you"
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "6px 15px",
              }}
            >
              Upload
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}