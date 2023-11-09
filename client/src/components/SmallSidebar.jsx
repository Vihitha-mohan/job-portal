import { useContext } from "react";
import Wrapper from "../assets/wrappers/SmallSidebar"
import { DashBoardContext } from "../pages/DashboardLayout"
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import React  from 'react';



export default function SmallSidebar() {
    const {showSidebar,toggleSideBar} = useContext(DashBoardContext);
    console.log(toggleSideBar);
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className="content">
            <button type='button' className="close-btn" onClick={toggleSideBar}>
                <FaTimes />
            </button>
            <header>
                <Logo />
            </header>
        <NavLinks />
        </div>

      </div>
    </Wrapper>
  )
}
