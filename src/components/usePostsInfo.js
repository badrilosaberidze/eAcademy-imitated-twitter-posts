import { useState, useEffect } from "react";

function usePostsInfo(postId) {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [photo, setPhoto] = useState({});

  const [allDataIsReceived, setAllDataIsReceived] = useState(false);

  const getImage = async (postId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${postId}`
    );
    const data = await response.json();
    return data;
  };

  const getComments = async (postId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await response.json();
    return data;
  };

  const getUser = async (userId) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      let data = await response.json();
      let user = await getUser(data.userId);
      let comments = await getComments(data.id);
      let photo = await getImage(data.id);
      setUser(user);
      setComments(comments);
      setPhoto(photo);
      setPost(data);
      setAllDataIsReceived(true);
    };

    getPost();
  }, [postId]);

  return { post, user, comments, photo, allDataIsReceived };
}
export default usePostsInfo;
