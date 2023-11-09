import React  from 'react';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';

export const loader = async({request}) =>
{
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try{
    const {data} = await customFetch.get('/jobs',{
      params
    });
    return {data,searchvalues:{...params}};
  }
  catch(error)
  {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

export const AllJobsContext = createContext();
export default function AllJobs() {
  const {data,searchvalues} = useLoaderData();
  return (
    <>
    <AllJobsContext.Provider value={{data,searchvalues}}> 
      <SearchContainer /> 
     <JobsContainer /> 
      </AllJobsContext.Provider>
    </>
  )
}
