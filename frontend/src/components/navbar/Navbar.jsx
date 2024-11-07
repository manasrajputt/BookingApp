import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">BookingApp</span>
        </Link>
        {user ? (
          <div className="navItems">
            {user.img && user.img?.url && (
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  marginTop: "6px",
                }}
              >
                <img
                  src={user.img?.url}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <Link to="/profile" style={{textDecoration:"none", color:"white"}}>{user.username}</Link>
            <button className="navButton" onClick={handleClick}>
              logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
