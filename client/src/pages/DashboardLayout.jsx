import { Outlet,redirect,useLoaderData,useNavigate,useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import  {BigSidebar,SmallSidebar,NavBar,Loading} from '../components'
import { createContext, useEffect, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import React  from 'react';
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/user/current-user');
    return data;
  },
};

export  const loader =(queryClient)=>async()=>
{
 try{
  return await queryClient.ensureQueryData(userQuery);
 }
 catch(error)
 {
  return redirect('/');
 }
}
export const DashBoardContext = createContext();




function DashboardLayout({queryClient}) {
  const {user} = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading' ;
  // console.log(data);
// //temp
// const user = {name:'John'};
const [showSidebar,setShowSidebar] = useState(false);
const [isDarkTheme,setIsDarkTheme] = useState(checkDefaultTheme());
const [isAuthError,setIsAuthError] = useState(false)


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
  queryClient.invalidateQueries();
  toast.success('Logging out ....')
}

customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      setIsAuthError(true);
    }
    return Promise.reject(error);
  }
);

useEffect(() => {
  if (!isAuthError) return;
  logoutUser();
}, [isAuthError]);

  return (
    <DashBoardContext.Provider value ={{user,toggleDarkTheme,toggleSideBar,logoutUser,showSidebar,isDarkTheme}}>
    <Wrapper>
      <main className="dashboard">
        <BigSidebar />
        <SmallSidebar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            {isPageLoading ? <Loading />:  <Outlet context={{user}} />}
        
          </div>
        </div>
      </main>
    </Wrapper>
    </DashBoardContext.Provider>
  )
}


export default DashboardLayout;