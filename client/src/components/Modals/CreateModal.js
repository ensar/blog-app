import { useState } from "react";
import { api } from "../../utils/api";
import styles from "./modal.module.css";
import { toast } from "react-toastify";

const Modal = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    data.append("postImage", image);
    try {
      const response = await api().post("/posts", data);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.modal} style={{ display: isOpen ? "" : "none" }}>
      <span onClick={() => setIsOpen(false)}>x</span>
      <h1>Create a blog</h1>
      <form onSubmit={(e) => createPost(e)}>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Modal;
