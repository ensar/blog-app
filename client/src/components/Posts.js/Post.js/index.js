import React from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

const Post = ({ post }) => {
  return (
    <div className={styles.post}>
      <img
        src={`${process.env.PUBLIC_URL}/uploads/${post.image}`}
        alt="blogimg"
      ></img>
      <div className={styles.blogInfo}>
        <Link to={`/posts/${post._id}`}>
          <h1>{post.title.substr(0, 15)}</h1>
          <h4>- {post.user.username}</h4>
        </Link>
        <p>{post.content.substr(0, 40)} </p>
        <p className={styles.date}>
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Post;
