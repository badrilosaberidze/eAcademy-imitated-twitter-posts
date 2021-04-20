import React from "react";
import usePostsInfo from "./usePostsInfo";

const Post = (props) => {
  const { post, user, comments, photo, allDataIsReceived } = usePostsInfo(
    props.givenPostID
  );

  const handleLike = (id) => props.saveMyLikes(id);

  return (
    <>
      {allDataIsReceived && (
        <>
          <div>
            <div>
              <h1>{post.title}</h1>
              <span>{user.name} </span>
              <strong>{user.email}</strong>
              <p>{post.body}</p>
              <div>
                <img src={photo.url} alt={photo.title} />
              </div>
              <span>post id {post.id}</span>
              <div>
                <button onClick={() => handleLike(post.id)}>
                  {props.likesArray[post.id]?.like ? "Unlike" : "Like"}
                </button>
                {props.likesArray[post.id]?.like && "❤"}
              </div>
            </div>

            <div>
              <h2>Comments</h2>
              <div>
                {comments?.map((comment, id) => (
                  <div key={id}>
                    <h3>{comment.name}</h3>
                    <span>{comment.email}</span>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
