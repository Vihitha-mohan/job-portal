
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import React  from 'react';

export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />  
      </nav>
      <div className='container page'>
      <div className='info'>
        <h1>job <span>tracking</span></h1>
        <p>
          Find your dream job in a jiffy.......
        </p>
        <Link to="/register" className="btn register-link">Register</Link>
        <Link to="/login" className="btn register-link">Login / Demo User</Link>
      </div>
      <img src={main} alt="job" className='img main-img' />
      </div>
    </Wrapper>
  )
}
