import { useContext } from 'react';
import { DashBoardContext } from '../pages/DashboardLayout';
import links from '../utils/Links';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React  from 'react';



const NavLinks = ({isBigSidebar}) => {
    const {toggleSideBar,user}=useContext(DashBoardContext);
    console.log("user role",user);
  return (
    <div>
          <div className="nav-links">
    {links.map((link)=>{
        const {text,path,icon} = link;
        const {role} = user
    //end - added below ... Because the first element always remains active ...Inorder to avoid it
    if(path ==='admin' && role !=='admin') return null;
        return <NavLink to={path} key={text} className='nav-link' onClick={isBigSidebar ? null:toggleSideBar} end><span className="icon">{icon}</span>{text}</NavLink>
    })}
    </div>
    </div>
  )
}

NavLinks.propTypes = {
    isBigSidebar : PropTypes.bool

}
export default NavLinks;
