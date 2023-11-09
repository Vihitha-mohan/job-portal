import { Outlet,redirect,useLoaderData,useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import  {BigSidebar,SmallSidebar,NavBar} from '../components'
import { createContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import React  from 'react';



export  const loader =async()=>
{
 try{
const {data}=await customFetch.get('/user/current-user');
return data;
 }
 catch(error)
 {
  return redirect('/');
 }
}
export const DashBoardContext = createContext();




function DashboardLayout() {
  const {user} = useLoaderData();
  const navigate = useNavigate();
  // console.log(data);
// //temp
// const user = {name:'John'};
const [showSidebar,setShowSidebar] = useState(false);
const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());

function toggleDarkTheme()
{
const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle('dark-theme',newDarkTheme);
  localStorage.setItem('darkTheme',newDarkTheme);
}

function toggleSideBar ()
{
  setShowSidebar(!showSidebar);
 
}

async function logoutUser()
{
  navigate('/');
  await customFetch.get('/auth/logout');
  toast.success('Logging out ....')
}
  return (
    <DashBoardContext.Provider value ={{user,toggleDarkTheme,toggleSideBar,logoutUser,showSidebar,isDarkTheme}}>
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <SmallSidebar />
        <div>
          <NavBar />
          <div className="dashboard-page">
          <Outlet context={{user}} />
          </div>
        </div>
      </main>
    </Wrapper>
    </DashBoardContext.Provider>
  )
}


export default DashboardLayout;