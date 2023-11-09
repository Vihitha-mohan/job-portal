import Wrapper from "../assets/wrappers/LandingPage";
import React  from 'react';

import img from '../assets/images/not-found.svg'
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <Wrapper>
    <div>
      <img src={img} alt="not found" />
      <h3>Page not found</h3>
      <p>we can t find the page you are looking for</p>
      <Link to="/dashboard">Back Home</Link>
    </div>
    </Wrapper>
  )
}
