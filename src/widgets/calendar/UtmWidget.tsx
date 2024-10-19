import { Badge, BadgeProps, Calendar, CalendarProps } from 'antd';
import React, { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import UtmWidgetCalendar from './atoms/UtmWidgetCalendar';
import axios from 'axios';
import { EventType } from '../../lib/types';


const UtmWidget = () =>{

  const [data, setData] = useState([] as EventType[]);

  useEffect(()=>{
    axios.get("/parse/classes/Event", {
      headers: {
      'X-Parse-Application-Id': "collabothon",
      },
    }).then(({data})=>{
      data.results?.forEach((d:any)=>{
        d.startDate = new Date(d.startDate.iso)
        if(d.endDate){
          d.endDate = new Date(d.endDate.iso)
        }
      })
      setData(data.results);
    })
   
  },[])



    return(
        <UtmWidgetCalendar data={data}/>
    )
}

export default UtmWidget;