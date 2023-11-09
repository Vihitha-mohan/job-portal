import React from 'react';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItems from './StatItems';  

export default function StatsContainer({defaultStat}) {
  const stats =[
    {
      title:'pending applications',
      count:defaultStat?.pending || 0,
      icon:<FaSuitcaseRolling />,
      color:'#f59e0b',
      bcg:'#fef3c7'
    },
    {
      title: 'interviews scheduled',
      count: defaultStat?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStat?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ]
  return (
    <Wrapper>
     {stats.map((item)=>{
      return <StatItems key={item.title} {...item}/>
     })}
    </Wrapper>
  )
}
