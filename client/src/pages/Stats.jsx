import React  from 'react';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';


const statsQuery = {
  queryKey:['stats'],
  queryFn:async ()=>
  {
   const response = await customFetch.get('/jobs/stats')
   return response.data;
 }
}
export const loader =(queryClient)=> async()=>
{
 const data = await queryClient.ensureQueryData(statsQuery);
 return data;
}

export default function Stats() {
//  const {defaultStat,monthlyApplications} = useLoaderData();
const {data} = useQuery(statsQuery);

const {defaultStat,monthlyApplications} = data;
  return (
    <div>
      <StatsContainer defaultStat={defaultStat} />
      {monthlyApplications?.length >1 && <ChartsContainer data={monthlyApplications} />}
    </div>
  )
}
