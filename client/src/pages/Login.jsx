import { Link, Form, redirect, useNavigation, useNavigate } from 'react-router-dom';import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import React  from 'react';



export const action =(queryClient)=> async({request})=>
{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try
  {
    await customFetch.post('/auth/login',data);
    queryClient.invalidateQueries();
    toast.success('Login Success');
    return redirect('/dashboard/');
  }
  catch(error)
  {
    toast.error(error?.response?.data?.message);
        return error;
  }

}
export default function Login() {
const navigate = useNavigate();
const loginDemoUser = async()=>
{
  const data ={
    email:'test@test.com',
    password:'secret123'
  }
  try{
    await customFetch.post('/auth/login',data);
    toast.success('Take a test drive ....');
    navigate('/dashboard');
  }
  catch(error)
  {
    toast.error(error?.response?.data?.message);

  }
}
  return (
    <Wrapper>
    <Form method='post' className="form">
      <Logo />
    <h4>Login</h4>
    <FormRow type="email" name="email" defaultValue='john@gmail.com'/>
    <FormRow type="password" name="password" defaultValue='secret123' />
    <SubmitBtn />
    <button type='submit' className="btn btn-block" onClick={loginDemoUser}>explore the app</button>
    </Form>
    <p>Not a member yet?
        <Link to="/register" className="member-btn">Register</Link>
      </p>
    </Wrapper>
  )
}
