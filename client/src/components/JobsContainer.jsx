import React, { useContext } from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer';
import {AllJobsContext} from '../pages/AllJobs'
import PageBtnContainer from './PageBtnContainer';

export default function JobsContainer() {
    const {data}= useContext(AllJobsContext);
   
    const {jobs,totalJobs,numOfPages}= data;
    if(jobs.length ===0)
    {
        <Wrapper>
            <h2>No jobs to display ... </h2>
        </Wrapper>
    }
  return (
   <Wrapper>
    <h5>{totalJobs} job{jobs.length>1 && 's'}</h5>
    <div className='jobs'>
    {jobs.map((job)=>
    {
        return <Job key={job._id} {...job}/>
    })}
    </div>
    {numOfPages > 1 && <PageBtnContainer />}
   </Wrapper>
  )
}
