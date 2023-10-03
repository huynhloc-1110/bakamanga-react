import { Col, Dropdown } from "react-bootstrap";
import CommentSection from "../commentSection";

export default function PCPost({ post, close }) {
  const DropDownOptions = () => (
    <Dropdown as={"span"}>
      <Dropdown.Toggle variant="outline" className="manga-list-options-toggle">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Report</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };
  return (
    <Col md={post?.imageUrls.length > 0 ? 6 : 12}>
      <div className="modal-community-info">
        <div className="modal-user-info">
          <div>
            <img
              className="avatar"
              src={post?.user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
            <span className="comment-name">{post?.user.name}</span>
            <span className="comment-time">
              {calculateTimeDifference(post?.createdAt)}
            </span>
          </div>
          <div className="close-com" onClick={close}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <p style={{ marginBottom: "5px" }}>{post?.content}</p>
        <div style={{ marginBottom: "10px" }}>
          {post?.likeCount}
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-up" />
          </button>
          {post?.dislikeCount}
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-down" />
          </button>
          <DropDownOptions />
        </div>
        <div className="comment-post">
          <CommentSection type="post" typeId={post?.id} />
        </div>
      </div>
    </Col>
  );
}
