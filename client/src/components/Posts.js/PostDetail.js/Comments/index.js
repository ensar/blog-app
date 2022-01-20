import styles from "../postDetail.module.css";
import Comment from "./Comment";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../../utils/api";
import { useParams } from "react-router-dom";

const Comments = ({ cm }) => {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState(cm);
  const params = useParams();

  const sendComment = async (e) => {
    e.preventDefault();
    if (comment) {
      try {
        const response = await api().post(`/posts/${params.id}/add-comment`, {
          comment,
        });
        setComments(response.data.comments);
        setComment("");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className={styles.comments}>
      <h1>Comments</h1>
      <div className={styles.addComment}>
        <form
          onSubmit={(e) => {
            sendComment(e);
          }}
        >
          <textarea
            rows={2}
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button type="submit">Add Comment</button>
        </form>
      </div>
      {comments?.map((comment) => {
        return (
          <Comment
            comment={comment}
            setComments={setComments}
            key={comment._id}
          />
        );
      })}
    </div>
  );
};

export default Comments;
