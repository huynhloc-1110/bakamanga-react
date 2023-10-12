import { Button, Modal } from "react-bootstrap";
import EditProfileModal from "./editProfileModal";
import "../styles.css";
import { useState } from "react";

export default function Account() {
  const [userNameModal, setUserNameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [biographyModal, setBiographyModal] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  return (
    <>
      <div className="edit-profile">
        <div className="edit-label">
          <b>Username</b>
          <span>username</span>
        </div>
        <Button variant="dark" onClick={() => setUserNameModal(!userNameModal)}>
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Change Biography</b>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            libero quam eveniet accusantium nulla aspernatur voluptatum ullam
            eos culpa, soluta beatae eligendi deleniti a doloribus labore nobis
            facilis cum magni sit ducimus eum ipsa incidunt dolore. Dolorem ea
            adipisci necessitatibus rerum animi voluptatem dolor omnis nihil,
            hic, maiores, cum iure. Minus esse non blanditiis animi officia
            laboriosam doloribus at vero iusto. Id alias veniam laborum numquam
            iste, iure aliquam obcaecati iusto sint a ipsam vero unde dolore
            tempore nam non ullam eum! Autem vel veritatis quo, nihil recusandae
            quam possimus tenetur numquam facere? Tempore at libero, asperiores
            hic placeat aperiam.
          </span>
        </div>
        <Button
          onClick={() => setBiographyModal(!biographyModal)}
          variant="dark"
        >
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Change Password</b>
          <span style={{ color: "red" }}>
            Enter your current password and new password for changes.
          </span>
        </div>
        <Button
          onClick={() => setPasswordModal(!passwordModal)}
          variant="danger"
        >
          Edit
        </Button>
      </div>
      <hr />

      <div className="edit-profile">
        <div className="edit-label">
          <b>Delete Account</b>
          <span style={{ color: "red" }}>
            Permanently delete your 3KManga account. Once deleted, the data is
            not recoverable. Uploaded chapters will not be deleted with the
            account.
          </span>
        </div>
        <Button
          variant="danger"
          onClick={() => {
            setDeleteAccount(!deleteAccount);
          }}
        >
          Delete
        </Button>
      </div>

      {/* Modal for username and password */}
      <EditProfileModal
        show={userNameModal}
        setShow={setUserNameModal}
        title="Change username"
        inputLabels={["Username"]}
      />
      <EditProfileModal
        show={passwordModal}
        setShow={setPasswordModal}
        title="Change Password"
        inputLabels={[
          "Current password",
          "New password",
          "Confirm new password",
        ]}
      />
      <EditProfileModal
        show={biographyModal}
        setShow={setBiographyModal}
        title="Change biography"
        inputLabels={["Biography"]}
      />

      {/* Remove modal */}
      <Modal
        show={deleteAccount}
        onHide={() => setDeleteAccount(!deleteAccount)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="kick-member-info">
            <img
              className="group-avatar"
              src={"/img/avatar/default.png"}
              alt="avatar"
            />
            <b style={{ fontSize: "20px", paddingBottom: "10px" }}>username</b>
            <span style={{ textAlign: "center", color: "red" }}>
              You are deleting your account. This action cannot be reversed, are
              you sure about this?
            </span>
          </div>
          <div className="modal-button">
            <Button
              variant="danger"
              onClick={() => setDeleteAccount(!deleteAccount)}
            >
              Confirm delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}