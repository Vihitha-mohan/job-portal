import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// All the pages inside index.js will be imported by default (no need to specify indexedDB.js in the path)
import {HomeLayout,Register,Login,DashboardLayout,Landing,Error,AddJob,Stats,AllJobs,Profile,Admin,EditJob} from './pages'
import {action as registerAction} from './pages/Register'
import {action as loginAction} from './pages/Login';
import {action as addJobAction} from './pages/AddJob';
import {action as editJobAction} from './pages/EditJob';
import {action as deleteJobAction} from './pages/DeleteJob';
import {action as profileAction} from './pages/Profile';

import {loader as dashboardLoader} from './pages/DashboardLayout';
import {loader as allJobsLoader} from './pages/AllJobs';
import {loader as editJobLoader} from './pages/EditJob';
import {loader as adminLoader} from './pages/Admin';
import {loader as statsLoader} from './pages/Stats';



import React  from 'react';
import ErrorElement from "./components/ErrorElement";



export const checkDefaultTheme=()=>
{
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme',isDarkTheme);
  return isDarkTheme;
}

checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action:registerAction      },
      {
        path: 'login',
        element: <Login />,
        action:loginAction(queryClient)
    
      },
      {
        path: 'dashboard',
        element: <DashboardLayout  queryClient={queryClient}/>,
        loader:dashboardLoader(queryClient),

        children: [
          {
            index: true,
            element: <AddJob />,
            action:addJobAction(queryClient)
  
          },
          {
            path: 'stats',
            element: <Stats />,
            loader:statsLoader(queryClient),
            errorElement:<ErrorElement />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader:allJobsLoader(queryClient),
            errorElement:<ErrorElement />

          },
          {
            path: 'profile',
            element: <Profile />,
            action:profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader:adminLoader
          },
          {
            path:'edit-job/:id',
            element:<EditJob />,
            loader:editJobLoader(queryClient),
            action:editJobAction(queryClient)
          },
          {
            path:'delete-job/:id',
            action:deleteJobAction(queryClient)
          }
        ],
      },
    ],
}])

export default function App() {
  return (
<>
{/* <BrowserRouter>
<Routes>
  <Route path = '/' element={<HomeLayout />}>
  <Route index element={<Landing/>}/>
  <Route path = 'register' 
  element={<Register/>}
  action={()=>
  {
    console.log("hello");
    return null;
  }}
  />
  <Route path = 'login' element={<Login/>}/>
  <Route path = 'dashboard' element={<DashboardLayout />}>
    <Route index element={<AddJob />} />
    <Route path='stats' element={<Stats />} />
    <Route path='all-jobs' element={<AllJobs />} />
    <Route path='profile' element={<Profile />} />
    <Route path='admin' element={<Admin />} />
  </Route>
 </Route>
 <Route path='*' element={<Error />}></Route>
</Routes>


</BrowserRouter> */}
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>

</>
  )
}
