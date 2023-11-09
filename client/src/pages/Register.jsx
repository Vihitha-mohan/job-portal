import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import {toast} from 'react-toastify';
import React  from 'react';


export const action =async({request})=>
{
const formData = await request.formData();
const data = Object.fromEntries(formData);
try
{
await customFetch.post('/auth/register',data);
toast.success('Registration Successful');
return redirect('/login');
}
catch(error)
{

toast.error(error?.response?.data?.message);
return error;
}


}

export default function Register() {
  const navigation = useNavigation();

  return (
    <Wrapper>
    <Form method="post"  className="form">
      <Logo />
      <h4>Register</h4>
      <FormRow type='text' name='name' LabelText='Name' defaultValue='john'/>
      <FormRow type="text" name="lastName" labelText='last name' defaultValue='smith'/>
      <FormRow type="text" name="location" />
      <FormRow type="text" name="email"  defaultValue='john@gmail.com'/>
      <FormRow type="text" name="password" defaultValue='secret123'/>

      <SubmitBtn />
      <p>Already a member?
        <Link to="/login" className="member-btn">Login</Link>
      </p>
    </Form>
    </Wrapper>
  )
}
