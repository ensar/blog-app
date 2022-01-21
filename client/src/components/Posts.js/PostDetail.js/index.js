import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./postDetail.module.css";
import { api } from "../../../utils/api";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import Comments from "./Comments";
import UpdateModal from "../../Modals/UpdateModal";

const PostDetail = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = jwt_decode(token);

  const getPostDetail = async () => {
    setLoading(true);
    await api()
      .get(`/posts/${params.id}`)
      .then((res) => {
        setPostData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.err(err.message);
        setLoading(false);
      });
  };

  const deletePost = async (e) => {
    e.preventDefault();
    await api()
      .delete(`posts/${params.id}`)
      .then((res) => {
        toast.success("Blog Silindi.");
        navigate("/posts");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <>
      <div className={styles.postDetail}>
        {loading && <div>Post Loading...</div>}
        {postData && (
          <>
            <img alt="postImage" src={postData.image}></img>
            <div className={styles.content}>
              <div className={styles.postHeader}>
                <h1>{postData.title}</h1>
                {postData.user._id === decodedToken.id && (
                  <div>
                    <button
                      className={styles.updateBtn}
                      onClick={() => {
                        setIsOpen(true);
                        window.scrollTo(0, 0);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => deletePost(e)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.info}>
                <h4>{postData.user.username}</h4>
                <span>
                  {new Date(postData.created_at).toLocaleDateString()}
                </span>
              </div>
              <p> {postData.content}</p>
            </div>
            <Comments cm={postData.comments} />
          </>
        )}
      </div>
      {postData && (
        <UpdateModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          defaultTitle={postData.title}
          defaultContent={postData.content}
        />
      )}
    </>
  );
};

export default PostDetail;
