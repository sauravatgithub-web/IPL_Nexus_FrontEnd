import React from 'react';
import classes from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import pphoto from "../Assests/profilephoto.png";
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';
import axios from 'axios';
import { server } from '../Assests/config';
import toast from 'react-hot-toast';
import teamMap from '../Assests/team';

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logOut`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        Welcome to the <span className={classes.teamName}>{teamMap.get(user.iplTeam)}</span> Fan Store!
      </div>

      <ul className={classes.links}>
        <li className={classes.pimage}>
          <NavLink to={`user/${user?._id}`} className={({ isActive }) => (isActive ? classes.active : undefined)}>
            <img src={pphoto} alt="Profile" />
          </NavLink>
        </li>
        <li>
          <button className={classes.btn} onClick={handleLogOut}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}
