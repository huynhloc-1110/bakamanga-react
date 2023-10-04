import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import PostCreateButton from "../../../components/post/postCreateButton";
import { UserContext } from "../../../context/UserContext";
import CreatePostModal from "./CreatePostModal";
import PcPost from "../../../components/post/pcPost";
import PcModal from "../../../components/post/pcModal";
import MobilePost from "../../../components/post/mobilePost";
import MobileModal from "../../../components/post/mobileModal";

export default function Community() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [targetedPostId, setTargetedPostId] = useState(null);
  const targetPost = targetedPostId
    ? posts.find((post) => post.id === targetedPostId)
    : null;

  const handleCreatePost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleReactPost = (postId, selectedReact) => {
    const nextPosts = [...posts];
    const post = nextPosts.find((post) => post.id === postId);
    const prevReactFlag = post.userReactFlag;

    if (selectedReact === "Like") {
      if (prevReactFlag === "Like") {
        post.likeCount--;
        post.userReactFlag = "None";
      } else if (prevReactFlag === "Dislike") {
        post.likeCount++;
        post.dislikeCount--;
        post.userReactFlag = "Like";
      } else {
        post.likeCount++;
        post.userReactFlag = "Like";
      }
    } else {
      if (prevReactFlag === "Like") {
        post.likeCount--;
        post.dislikeCount++;
        post.userReactFlag = "Dislike";
      } else if (prevReactFlag === "Dislike") {
        post.dislikeCount--;
        post.userReactFlag = "None";
      } else {
        post.dislikeCount++;
        post.userReactFlag = "Dislike";
      }
    }

    setPosts(nextPosts);
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
      const res = await postApi.getPosts(userId);
      setPosts(res.data);
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
              post={post}
              open={() => setTargetedPostId(post.id)}
              react={handleReactPost}
            />
          ) : (
            <PcPost
              key={post.id}
              post={post}
              open={() => setTargetedPostId(post.id)}
              react={handleReactPost}
            />
          )
        )}

      {targetedPostId &&
        (isMobile ? (
          <MobileModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            react={handleReactPost}
          />
        ) : (
          <PcModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            react={handleReactPost}
          />
        ))}
    </>
  );
}
