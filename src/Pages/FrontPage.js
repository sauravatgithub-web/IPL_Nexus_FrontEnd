import React from "react";
import classes from "./FrontPage.module.css";
// import image from "../Assets/Frame1.jpg";
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        {/* <img className={classes.img} src={image} alt="IPL Store Logo" /> */}
        <ul className={classes.desc}>
          <li>🏏 Explore your favorite IPL team’s exclusive merchandise!</li>
          <li>🔥 Get the latest jerseys, fan gear, and memorabilia.</li>
          <li>🎉 Celebrate the spirit of IPL with a personalized shopping experience just for you.</li>
        </ul>
        <Link to="auth/login">
          <button className={classes.btn}>ENTER THE STORE 🏟️</button>
        </Link>
      </div>
    </div>
  );
}

export default FrontPage;