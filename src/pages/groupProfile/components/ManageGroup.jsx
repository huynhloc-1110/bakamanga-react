import { useState, useEffect, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import * as groupApi from "../../../service/api.group";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ManageMembers from "./ManageMembers";
import EditGroup from "./EditGroup";

export default function ManageGroup() {
  const [groupDetails, setGroupDetails] = useState(null);
  const { groupId } = useParams();
  const sortOptions = ["Manage Member", "Request Member", "Edit Group"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `Manage Group - ${result.data.name} - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getGroupDetail(groupId);
  }, [groupId]);

  return (
    <Container fluid>
      <ToastContainer />
      <div className="group-name">
        <Link to={`/groups/${groupId}`}>
          <button className="return-button">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>{" "}
        {groupDetails?.name} Group
      </div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ paddingBottom: "20px" }}
      >
        <div className="d-flex">
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {toLabel(option)}
            </Button>
          ))}
        </div>
      </div>
      {sortOption === "Manage Member" && <ManageMembers groupId={groupId} />}
      {sortOption === "Edit Group" && (
        <EditGroup
          groupDetails={groupDetails}
          getGroupDetail={getGroupDetail}
        />
      )}
    </Container>
  );
}
