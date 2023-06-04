import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      <img className="logo"
        alt="logo"
        src="https://yt3.googleusercontent.com/ytc/AGIKgqOpew-op5VY99ZRjdyeRUHl3HeeBJFV5hJ7gUo4TA=s900-c-k-c0x00ffffff-no-rj"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            {" "}
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            {" "}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}
