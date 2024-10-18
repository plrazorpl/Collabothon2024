import { Badge, BadgeProps, Calendar, CalendarProps } from 'antd';
import React from 'react';
import type { Dayjs } from 'dayjs';
import WidgetBorder from '../../lib/WidgetBorder';


const getListData = (value: Dayjs) => {
    let listData: { type: string; content: string }[] = []; // Specify the type of listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event......' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };
  
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

const CalendarWidget = () =>{

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      };
    
    //   const dateCellRender = (value: Dayjs) => {
    //     const listData = getListData(value);
    //     return (
    //       <ul className="events">
    //         {listData.map((item) => (
    //           <li key={item.content}>
    //             <Badge status={item.type as BadgeProps['status']} />
    //             {/* <Badge status={item.type as BadgeProps['status']} text={item.content} /> */}
    //           </li>
    //         ))}
    //       </ul>
    //     );
    //   };

      const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
          <>
            {listData.map((item) => (             
                <Badge status={item.type as BadgeProps['status']} />
            ))}
          </>
        );
      };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };

    const header = () => (<div>dupa</div>)

    return(
        <Calendar cellRender={cellRender} headerRender={header}/>
    )
}

export default CalendarWidget;