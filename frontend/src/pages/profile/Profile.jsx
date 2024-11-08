import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";
import axios from "axios";

function Profile() {
  const { user, dispatch, loading, error } = useContext(AuthContext);
  const id = user._id;
  const [credentials, setCredentials] = useState({
    username: user.username || "",
    email: user.email || "",
    country: user.country || "",
    city: user.city || "",
    phone: user.phone || "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://bookingapp-backend-su6r.onrender.com/api/users/${id}`,
        credentials,
        { withCredentials: true }
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      alert("Profile Updated");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="lContainer">
          <h2 style={{ textAlign: "center", color: "#003580" }}>
            Profile Details
          </h2>
          <input
            type="text"
            value={credentials.username}
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Email"
            value={credentials.email}
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Country"
            value={credentials.country}
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="City"
            value={credentials.city}
            id="city"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Phone"
            value={credentials.phone}
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Update Profile
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  );
}

export default Profile;
