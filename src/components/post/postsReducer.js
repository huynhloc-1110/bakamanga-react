export default function postsReducer(posts, action) {
  switch (action.type) {
    case "add": {
      const nextPosts = posts.map((post) => ({ ...post }));
      return [action.newPost, ...nextPosts];
    }
    case "fetch": {
      const nextPosts = posts.map((post) => ({ ...post }));
      return [...nextPosts, ...action.newPosts];
    }
    case "react": {
      const nextPosts = [...posts];
      const post = nextPosts.find((post) => post.id === action.postId);
      const prevReactFlag = post.userReactFlag;

      if (action.flag === "Like") {
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
      return nextPosts;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
