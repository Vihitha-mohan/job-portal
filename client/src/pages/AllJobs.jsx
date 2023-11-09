import React  from 'react';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allJobsQuery =(params)=>{
  const {search, jobStatus,jobType,sort,page} = params
  return {
    queryKey:['jobs',search ?? '',jobStatus?? 'all',jobType??'all',sort ?? 'newest',page ?? 1],
    queryFn: async () => {
      const {data} =  await customFetch.get('/jobs',{
      params
    })
  return data;
  }
  }
}

export const loader =(queryClient) => async({request}) =>
{
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  await queryClient.ensureQueryData(allJobsQuery(params))
  return {searchvalues:{...params}};

}

export const AllJobsContext = createContext();
export default function AllJobs() {
  const {searchvalues} = useLoaderData();
  const {data} = useQuery(allJobsQuery(searchvalues));
  return (
    <>
    <AllJobsContext.Provider value={{data,searchvalues}}> 
      <SearchContainer /> 
     <JobsContainer /> 
      </AllJobsContext.Provider>
    </>
  )
}
