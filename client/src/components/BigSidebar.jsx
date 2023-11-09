import Wrapper from "../assets/wrappers/BigSidebar"
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { DashBoardContext } from "../pages/DashboardLayout";
import { useContext } from "react";
import React  from 'react';


export default function BigSidebar() {
    const {showSidebar}= useContext(DashBoardContext);
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container ':'sidebar-container show-sidebar'}>
        <div className="content">
            <header>
            <Logo />
            </header>
            <NavLinks isBigSidebar  />
        </div>
      </div>
    </Wrapper>
  )
}
