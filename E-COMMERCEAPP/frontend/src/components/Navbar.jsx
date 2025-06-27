import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false); // route change par hamburger close
  }, [location.pathname]);

  const toggleRegister = () => setShowRegister((prev) => !prev);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPwd) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (res.status === 201 || res.ok) {
        alert("Registration successful!");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }

    setShowRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPwd("");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">WOMENZIA.</div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/collection">COLLECTION</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>

        <div className="nav-icons">
          <span title="Search" className="icon">
            <i className="fas fa-search"></i>
          </span>
          <span
            title="Account"
            className="icon clickable"
            onClick={toggleRegister}
          >
            <i className="fas fa-user"></i>
          </span>
          <span title="Cart" className="icon">
            <Link to="/cart" className="cart-link">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </span>
        </div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* ---------- Registration Modal ---------- */}
      {showRegister && (
        <div className="modal-backdrop" onClick={toggleRegister}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">Create an Account</h2>

            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="modal-input"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="modal-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="modal-input"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                required
                className="modal-input"
              />

              <button type="submit" className="modal-button">
                Sign Up
              </button>
            </form>

            <button onClick={toggleRegister} className="modal-close-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
