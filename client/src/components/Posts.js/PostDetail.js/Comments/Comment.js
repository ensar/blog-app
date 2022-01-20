import React from "react";
import styles from "../postDetail.module.css";
import { api } from "../../../../utils/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const Comment = ({ comment, setComments }) => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const user = jwt_decode(token);

  const deleteComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api().delete(`/posts/${params.id}/${comment._id}`);
      setComments(response.data.comments);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.commentInfo}>
          <h4>{comment.username}</h4>
          <span>{new Date(comment.commented_at).toLocaleDateString()}</span>
        </div>
        {user.name === comment.username && (
          <form onSubmit={(e) => deleteComment(e)}>
            <button type="submit">Delete</button>
          </form>
        )}
      </div>
      <div className={styles.content}>{comment.comment}</div>
    </div>
  );
};

export default Comment;
