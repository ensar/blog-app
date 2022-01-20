import { useState } from "react";
import { api } from "../../utils/api";
import styles from "./modal.module.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Modal = ({ isOpen, setIsOpen, defaultTitle, defaultContent }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [image, setImage] = useState();

  const params = useParams();
  const navigate = useNavigate();

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("postImage", image);
    try {
      const response = await api().patch(`/posts/${params.id}`, data);
      setIsOpen(false);
      navigate("/posts");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.modal} style={{ display: isOpen ? "" : "none" }}>
      <span onClick={() => setIsOpen(false)}>x</span>
      <h1>Update a blog</h1>
      <form onSubmit={(e) => updatePost(e)}>
        <div className={styles.formItem}>
          <label htmlFor="title">Blog Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="content">Blog Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <input
            type="file"
            name="postImage"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Modal;
