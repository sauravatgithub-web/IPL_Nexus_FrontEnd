import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../Components/NavBar";
import classes from './RootPage.module.css';

export default function Rootpage() {
  return (
    <div className = {classes.main}>
      <NavBar />      
      <Outlet /> 
    </div>
  );
}