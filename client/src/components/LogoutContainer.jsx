import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { DashBoardContext } from '../pages/DashboardLayout';
import { useContext, useState } from 'react';
import React  from 'react';

const LogoutContainer = () => {
    const [showLogout,setShowLogout] = useState(false);
    const {user,logoutUser} = useContext(DashBoardContext);
  return (
    <Wrapper>
      <button type='button' className='btn logout-btn' onClick={()=>setShowLogout(!showLogout)}>
      {user.avatar?<img src={user.avatar} alt='avatar' className='img' />:<FaUserCircle />}
      
      {user?.name}
      <FaCaretDown />
      </button>
      <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
      <button type='button' className='dropdown-btn' onClick={logoutUser}>Logout</button>
      </div>
    </Wrapper>
  )
}

export default LogoutContainer