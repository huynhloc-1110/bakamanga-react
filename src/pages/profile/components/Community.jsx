import { useContext, useEffect, useReducer, useState } from "react";
import { Button, ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import PostCreateButton from "../../../components/post/postCreateButton";
import { UserContext } from "../../../context/UserContext";
import CreatePostModal from "./CreatePostModal";
import PcPost from "../../../components/post/pcPost";
import PcModal from "../../../components/post/pcModal";
import MobilePost from "../../../components/post/mobilePost";
import MobileModal from "../../../components/post/mobileModal";
import postsReducer from "../../../components/post/postsReducer";

export default function Community() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, updatePosts] = useReducer(postsReducer, []);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [targetedPostId, setTargetedPostId] = useState(null);
  const targetPost = targetedPostId
    ? posts.find((post) => post.id === targetedPostId)
    : null;

  const handleCreatePost = (newPost) => {
    updatePosts({ type: "add", newPost });
  };

  const handleSeeMorePost = async (userId, createdAtCursor) => {
    try {
      const response = await postApi.getPosts(userId, {
        createdAtCursor: createdAtCursor?.createdAt,
      });
      updatePosts({ type: "fetch", newPosts: response.data });
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the handler initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserPosts = async (userId) => {
      const response = await postApi.getPosts(userId);
      console.log("click");
      updatePosts({ type: "fetch", newPosts: response.data });
    };
    fetchUserPosts(userId);
  }, [userId]);

  return (
    <>
      <ToastContainer />

      {user && user?.id === userId && (
        <PostCreateButton open={() => setShowCreatePost(true)} />
      )}

      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={handleCreatePost}
      />

      {posts &&
        posts.length > 0 &&
        posts.map((post) =>
          isMobile ? (
            <MobilePost
              key={post.id}
              open={() => setTargetedPostId(post.id)}
              post={post}
              updatePosts={updatePosts}
            />
          ) : (
            <PcPost
              key={post.id}
              open={() => setTargetedPostId(post.id)}
              post={post}
              updatePosts={updatePosts}
            />
          )
        )}

      {targetedPostId &&
        (isMobile ? (
          <MobileModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            updatePosts={updatePosts}
          />
        ) : (
          <PcModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            updatePosts={updatePosts}
          />
        ))}

      <div className="d-flex justify-content-center">
        <Button
          className="btn btn-light"
          onClick={() => handleSeeMorePost(userId, posts[posts.length - 1])}
        >
          See More
        </Button>
      </div>
    </>
  );
}
