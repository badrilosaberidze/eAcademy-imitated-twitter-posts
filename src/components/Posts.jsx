import React, { useEffect, useRef, useState } from "react";
import usePostsInfo from "./usePostsInfo";
import More from "../images/more.svg";
import Download from "../images/download.svg";
import Retweet from "../images/retweet.svg";
import Comments from "../images/speech-bubble.svg";

const Posts = (props) => {
  const [commentStatus, setCommentStatus] = useState(false);
  const [threeDotStatus, setThreeDotStatus] = useState(false);

  const commentPopupRef = useRef(null);
  const threeDotRef = useRef(null);

  const { post, user, comments, photo, allDataIsReceived } = usePostsInfo(
    props.givenPostID
  );

  const handleOnClick = (e) => {
    if (
      commentStatus &&
      commentPopupRef.current &&
      !commentPopupRef.current.contains(e.target)
    ) {
      setCommentStatus(false);
    }
    if (
      threeDotStatus &&
      threeDotRef.current &&
      !threeDotRef.current.contains(e.target)
    ) {
      setThreeDotStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  });

  const randomColor = () => {
    let r = parseInt(Math.random(0) * 255);
    let g = parseInt(Math.random(0) * 255);
    let b = parseInt(Math.random(0) * 255);

    return `rgb( ${r}, ${g}, ${b})`;
  };

  const handleLike = (id) => props.saveMyLikes(id);

  return (
    <>
      {allDataIsReceived && (
        <>
          <div className="post-wrapper" onClick={props.seeTweet}>
            <div className="post-top-wrapper">
              <div
                className="profile-pic"
                id="pp"
                style={{
                  backgroundColor: randomColor(),
                }}
              >
                {user.name[0]}
              </div>
              <div className="name-email-text-wrapper">
                <div className="name-email-wrapper">
                  <div className="name"> {user.name}</div>
                  <div className="email">{user.email}</div>
                </div>
                <p className="text">{post.body}</p>
              </div>
              <div className="three-dot">
                <img
                  className="icon"
                  src={More}
                  alt="threedot"
                  onClick={() => setThreeDotStatus(true)}
                />
                {threeDotStatus && (
                  <div className="list-container" ref={threeDotRef}>
                    <ul>
                      <li>
                        <button onClick={() => handleLike(post.id)}>
                          {props.likesArray[post.id]?.like ? "Unlike" : "Like"}
                        </button>
                        {props.likesArray[post.id]?.like && "❤"}
                      </li>
                      <li className="see-tweet" onClick={props.seeTweet}>
                        See Tweet
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="image-container">
              <img src={photo.url} alt={photo.title} />
            </div>
            <div className="bottom-container">
              <div className="comments">
                <img
                  className="icon"
                  src={Comments}
                  alt="comments"
                  onClick={() => setCommentStatus(true)}
                />
              </div>
              <div className="retweets">
                <img className="icon" src={Retweet} alt="retweets" />
              </div>
              <div className="download">
                <img className="icon" src={Download} alt="download" />
              </div>
            </div>
          </div>
          {commentStatus && (
            <div className="comment-popup-background">
              <div className="comment-popup" ref={commentPopupRef}>
                {comments?.map((comment, id) => (
                  <div key={id} className="comment-wrapper">
                    <div className="post-top-wrapper comment-top-wrapper">
                      <div
                        className="profile-pic"
                        style={{ backgroundColor: randomColor() }}
                      >
                        {comment.name[0]}
                      </div>
                      <div className="name-email-text-wrapper">
                        <div className="name-email-wrapper">
                          <div className="name"> {comment.name}</div>
                          <div className="email">{comment.email}</div>
                        </div>
                        <p className="text">{comment.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
