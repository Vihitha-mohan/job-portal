import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { DashBoardContext } from '../pages/DashboardLayout';
import React  from 'react';

import { useContext } from 'react';
export default function ThemeToggle() {
    const {toggleDarkTheme,isDarkTheme}= useContext(DashBoardContext);
  return (
    <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme?<BsFillSunFill className='toggle-icon'/>:<BsFillMoonFill />}
      
    </Wrapper>
  )
}
