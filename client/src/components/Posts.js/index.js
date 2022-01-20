import { useEffect, useState } from "react";
import Post from "./Post.js";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState();

  const getPosts = async () => {
    setLoading(true);
    await api()
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {loading && <div>Loading...</div>}
      {posts?.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
