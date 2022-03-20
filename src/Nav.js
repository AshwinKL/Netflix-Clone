import React from "react";
import { useEffect, useState } from "react";
import "./nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="netflix logo"
      ></img>
      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg"
        alt="user avatar"
      ></img>
    </div>
  );
};

export default Nav;
