import { useState, useContext, useEffect, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import * as groupApi from "../../service/api.group";
import Uploads from "./components/Uploads";
import About from "./components/About";
import AvatarModal from "./components/AvatarModal";
import BannerModal from "./components/BannerModal";
import Members from "./components/Members";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";

export default function Group() {
  const profileOptions = ["Uploads", "Community", "Members", "About"];
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isMod, setIsMod] = useState(false);
  const [profileOption, setProfileOption] = useState(profileOptions[0]);
  const { user } = useContext(UserContext);
  const memberId = user?.id;
  const [isUserAMember, setIsUserAMember] = useState(false);
  const { groupId } = useParams();
  const [showLeaveModal, setShowLeaveModal] = useState(null);

  const fetchMember = useCallback(async (groupId, memberId) => {
    try {
      const res = await groupApi.getMember(groupId, memberId);
      const roles = res.data.groupRoles;

      setIsUserAMember(roles.includes("Member"));
      setIsOwner(roles.includes("Owner"));
      setIsMod(roles.includes("Moderator"));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.error(
          `Failed to fetch member with ID: ${memberId} from group ID: ${groupId}`
        );
      }
    }
  }, []);

  useEffect(() => {
    getGroupDetail(groupId);
    fetchMember(groupId, memberId);
  }, [groupId, memberId, fetchMember]);

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `Group - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  // handle join group (need to improve)
  const handleJoinGroup = async (groupId) => {
    await groupApi.joinGroup(groupId);
    toast.success("You have joined this group");
    setIsUserAMember(true);
    setProfileOption("Uploads");
  };

  // handle leave group (need to make a modal)
  const handleLeaveGroup = async () => {
    try {
      if (isOwner) {
        toast.error(
          "You need to transfer the group ownership before leaving group"
        );
      } else {
        await groupApi.removeGroupMember(groupId, user?.id);
        toast.success("You have left this group");
        setIsUserAMember(false);
        setProfileOption("Uploads");
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div
        id="profile-banner"
        style={
          groupDetails?.bannerPath
            ? {
                backgroundImage: `url(${groupDetails.bannerPath})`,
                cursor: "pointer",
              }
            : {}
        }
        onClick={() => {
          if (isOwner) {
            setShowBannerModal(true);
          }
        }}
      ></div>

      <div id="profile-info">
        <div id="profile-details">
          <div className="container-avatar">
            <img
              id="profile-image"
              src={groupDetails?.avatarPath || "/img/avatar/defaultGroup.jpg"}
              alt="Avatar"
            ></img>
            {isOwner && (
              <div
                id="profile-image-change"
                onClick={() => {
                  setShowAvatarModal(true);
                }}
              >
                <i className="fa-solid fa-camera"></i>
              </div>
            )}
          </div>
          <div id="profile-name">{groupDetails?.name}</div>
          <div style={{ margin: "2px" }}>
            <span className="profile-text">
              {groupDetails?.memberNumber}{" "}
              {groupDetails?.memberNumber >= 2 ? "members" : "member"}
            </span>
          </div>
        </div>
        <div id="profile-buttons">
          {(isOwner || isMod) && (
            <Link to={`/manage/group/${groupId}`}>
              <Button variant="outline-dark">
                <i className="fa-solid fa-bars-progress"></i> Manage
              </Button>
            </Link>
          )}
          {!isUserAMember && !isOwner ? (
            <Button
              variant="outline-dark"
              onClick={() => handleJoinGroup(groupId)}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Join
            </Button>
          ) : (
            <Button
              variant="outline-dark"
              onClick={() => setShowLeaveModal(true)}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Leave
            </Button>
          )}
        </div>
      </div>
      <div className="general-container">
        <div className="profile-option-container">
          {profileOptions.map((option, index) =>
            option === "Uploads" && !groupDetails?.isMangaGroup ? null : (
              <Button
                key={index}
                variant={profileOption === option ? "dark" : "light"}
                onClick={() => setProfileOption(option)}
              >
                {option}
              </Button>
            )
          )}
        </div>
        {profileOption === "Uploads" && <Uploads groupId={groupId} />}
        {profileOption === "About" && <About groupDetails={groupDetails} />}
        {profileOption === "Members" && (
          <Members groupId={groupId} groupName={groupDetails?.name} />
        )}
      </div>
      <AvatarModal
        close={() => setShowAvatarModal(false)}
        show={showAvatarModal}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        groupId={groupId}
      />
      <BannerModal
        close={() => setShowBannerModal(false)}
        show={showBannerModal}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        groupId={groupId}
      />

      {/* Leave group modal */}
      <Modal show={showLeaveModal} onHide={() => setShowLeaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ textAlign: "center" }}>
            Are you sure you want to leave <b>{groupDetails?.name}</b>?
          </span>
          <div className="modal-button">
            <Button
              variant="success"
              onClick={() => {
                handleLeaveGroup();
                setShowLeaveModal(false);
              }}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={() => setShowLeaveModal(false)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
