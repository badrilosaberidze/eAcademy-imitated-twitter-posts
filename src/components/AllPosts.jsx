import React, { useEffect, useState } from "react";
import Post from "./Posts";

const AllPosts = () => {
  let PostIDsArray = [];
  for (let i = 1; i <= 100; i++) {
    PostIDsArray.push(i);
  }

  const [postsInfoExtra, setPostsInfoExtra] = useState({});

  const handleLike = (id) =>
    setPostsInfoExtra({
      ...postsInfoExtra,
      [id]: { ...postsInfoExtra[id], like: !postsInfoExtra[id]?.like },
    });

  const seeTweet = (id) => {
    PostIDsArray = PostIDsArray.filter((item, idx) => idx != id);
    console.log("works", id);
  };

  return (
    <div className="post-container">
      {PostIDsArray.map((id) => (
        <Post
          key={`post-${id}`}
          givenPostID={id}
          saveMyLikes={(id) => handleLike(id)}
          likesArray={postsInfoExtra}
          seeTweet={seeTweet(id)}
        />
      ))}
    </div>
  );
};

export default AllPosts;
