import React, { useContext, useState } from "react";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country: undefined,
    city: undefined,
    image: undefined,
    phone: undefined,
    password: undefined,
  });

  const { user, dispatch, loading, error } = useContext(AuthContext);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: e.target.type === "file" ? files[0] : value, // Assign file if it's a file input
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "REGISTER_START" });
    const formData = new FormData();

    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("country", credentials.country);
    formData.append("city", credentials.city);
    formData.append("phone", credentials.phone);
    formData.append("password", credentials.password);
    formData.append("image", credentials.image); // Attach the file with key "image"
    try {
      const res = await axios.post(
        "https://bookingapp-backend-su6r.onrender.com/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="register">
        <div className="lContainer">
          <h2 style={{ textAlign: "center", color: "#003580" }}>Register</h2>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Country"
            id="country"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="Phone"
            id="phone"
            onChange={handleChange}
            className="lInput"
          />
          <div className="image">
            <label className="lLabel">Upload Profile Image:</label>
            <input
              type="file"
              placeholder="Image"
              id="image"
              onChange={handleChange}
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
