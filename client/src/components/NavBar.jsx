import Wrapper from "../assets/wrappers/Navbar"
import {FaAlignLeft} from 'react-icons/fa'
import Logo from "./Logo"
import { DashBoardContext } from "../pages/DashboardLayout"
import { useContext } from "react"
import LogoutContainer from "./LogoutContainer"
import ThemeToggle from "./ThemeToggle";
import React  from 'react';


export default function NavBar() {
  const {toggleSideBar} = useContext(DashBoardContext);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
        <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <btn className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </btn>
      </div>
      
    </Wrapper>
  )
}
