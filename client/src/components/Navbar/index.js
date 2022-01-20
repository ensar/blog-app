import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import CreateModal from "../Modals/CreateModal";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    toast("Çıkış yapıldı.");
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/posts">Blog Page</Link>
        <ul>
          {user && (
            <>
              <button
                className={styles.createButton}
                onClick={() => setIsOpen(true)}
              >
                Create a blog
              </button>
              <Link to="/posts">Blogs</Link>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
      <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
