import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from '@fullcalendar/core/locales-all';
import React, { useCallback } from "react";

const Calendar = (props) => {
  
  const handleEventClick = useCallback((arg) => {
    if(arg.event.title === '空')
    {
      let date = new Date();
      if(arg.event.start != null) {
        date = arg.event.start
      }
      props.selectDate(date)
    }
  }, [])
  
  const getVacantInfo = (code, date) => {
    let vacantTypes = [
      {
        title: '空',
        color: '#cc0000',
        start: '',
      },
      {
        title: '満',
        color: '#999999',
        start: '',
      },
      {
        title: '休',
        color: '#999999',
        start: '',
      },  
    ]

    let vacantInfo = vacantTypes[code]
    if(vacantInfo) vacantInfo.start = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

    return vacantInfo
  }

  // 仮のランダムな予約
  let vacancyCodes = []
  for(let i = 0; i < 180; i++){
    let r = Math.floor( Math.random() * 3)
    vacancyCodes.push(r)
  }
  let reservations = []
  for(let i = 0; i < 180; i++){
    let day = new Date()
    day.setDate( day.getDate() + 1 + i)
    reservations.push(getVacantInfo(vacancyCodes[i], day))
  }

  return(
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        locales={allLocales}
        locale="ja"
        timeZone='Asia/Tokyo'
        headerToolbar={{ end: 'prev,today,next' }}
        buttonText={{ today: '今月' }}
        events={reservations}
        eventClick={handleEventClick}
        dayCellContent={(event) => (event.dayNumberText = event.dayNumberText.replace("日", ""))}
      />
    </>
  );
}

export default Calendar