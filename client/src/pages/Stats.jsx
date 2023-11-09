import React  from 'react';
import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';


export const loader = async()=>
{
  try
  {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  }
  catch(error)
  {
return error;
  }
}

export default function Stats() {
  const {defaultStat,monthlyApplications} = useLoaderData();
  return (
    <div>
      <StatsContainer defaultStat={defaultStat} />
      {monthlyApplications?.length >1 && <ChartsContainer data={monthlyApplications} />}
    </div>
  )
}
