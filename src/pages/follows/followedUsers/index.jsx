import { Link } from "react-router-dom";
import {
  Col,
  Container,
  FormSelect,
  Row,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import "../styles.css";

export default function FollowedUser() {
  const sortOptions = ["Follow User", "Following User"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  return (
    <>
      <Container id="manga-option" fluid>
        <div>
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        &nbsp;
        <Row className="follow-user-container justify-left d-flex flex-wrap">
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Link to={`/`} className="card-link">
                <img
                  className="group-avatar"
                  src="/img/avatar/default.png"
                  alt="group's cover"
                ></img>
              </Link>
              <div className="group-info">
                <Link to={`/`} className="card-link">
                  <p className="text-limit-2">
                    <b>followed username</b>
                  </p>
                </Link>
              </div>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline"
                  className="comment-options-toggle"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Unfollow</Dropdown.Item>
                  <Dropdown.Item>Report</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
