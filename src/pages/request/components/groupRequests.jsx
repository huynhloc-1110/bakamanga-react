import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import * as requestApi from "../../../service/api.request";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function GroupRequests() {
  const [requests, setRequests] = useState();
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [outOfReqs, setOutOfReqs] = useState(false);

  useEffect(() => {
    document.title = "Requests - 3K Manga";
  }, []);

  const fetchUserRequests = async () => {
    const res = await requestApi.getUserGroupRequests();
    setRequests(res.data);
    console.log("res", res);
  };

  const handleReadRequest = async (id) => {
    await requestApi.putUserGroupRequests(id);
    const nextRequest = requests.map((r) =>
      r.id === id ? { ...r, statusConfirmed: true } : { ...r }
    );
    setRequests(nextRequest);
  };

  useEffect(() => {
    fetchUserRequests();
  }, []);

  const handleSeeMoreRequests = async (createdAtCursor) => {
    try {
      const newReqs = await requestApi.getUserGroupRequests({
        createdAtCursor,
      });
      setRequests([...requests, ...newReqs.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newReqs.data.length > 0) {
        setOutOfReqs(false);
      } else {
        setOutOfReqs(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        requests.length > 0 &&
        !outOfReqs
      ) {
        setLoadingRequest(true);
        setTimeout(() => {
          handleSeeMoreRequests(requests[requests.length - 1]?.createdAtCursor);
          setLoadingRequest(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests]);

  return (
    <>
      <Container className="general-container">
        <Row>
          {requests ? (
            requests.map((request) => {
              return (
                <Col md={6}>
                  <div
                    className={
                      "request-container" +
                      (!request.statusConfirmed &&
                      (request.status === "Approve" ||
                        request.status === "Deny")
                        ? " notification"
                        : "")
                    }
                    onClick={() => handleReadRequest(request.id)}
                  >
                    <Link to={`/groups/${request.group.id}`}>
                      <div className="group-info">
                        <img
                          className="group-avatar"
                          src={
                            request.group.avatarPath ||
                            "/img/avatar/defaultGroup.jpg"
                          }
                          alt="avatar"
                        />
                      </div>
                    </Link>
                    {request.status === "Approve" && (
                      <i
                        className="fa-solid fa-circle-check request-icon"
                        style={{ color: "green" }}
                      ></i>
                    )}
                    {request.status === "Deny" && (
                      <i
                        className="fa-solid fa-circle-xmark request-icon"
                        style={{ color: "red" }}
                      ></i>
                    )}
                    {request.status === "Processing" && (
                      <i className="fa-solid fa-spinner request-icon"></i>
                    )}
                    <span style={{ flexGrow: "1" }}>
                      Your request is {request.status} to{" "}
                      <b>{request.group.name}</b>
                    </span>
                    <i className="fa-solid fa-circle mark-read-icon"></i>
                  </div>
                </Col>
              );
            })
          ) : (
            <p className="d-flex justify-content-center">
              You do not have any group request
            </p>
          )}
        </Row>
      </Container>

      {loadingRequest && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
}