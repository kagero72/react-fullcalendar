import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import allLocales from '@fullcalendar/core/locales-all';
import React, { useState, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import InfoForm from './infoform';


const Calendar = (props) => {

  const [modalShow, setModalShow] = useState(false);
  
  const handleEventClick = (arg) => {
    if(arg.event.title === '空')
    {
      // モーダルを表示
      setModalShow(true)
      // 日付を更新
      let date = new Date()
      if(arg.event.start != null) {
        date = arg.event.start
      }
      props.setInfo('date', date)
      props.setInfo('time', '')
    }
  }
  
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

    if(vacantTypes[code]) 
      vacantTypes[code].start = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    return vacantTypes[code]
  }

  let reservations = []
  for(let i = 0; i < 180; i++){
    let date = new Date()
    date.setDate(date.getDate() + 1 + i)
    const dateStr = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
    const dateData = props.vacantList[dateStr]
    let code = (dateData) ? ((dateData.vacant == '空きあり') ? 0 : 1) : 2
    reservations.push(getVacantInfo(code, date))
  }

  return(
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        locales={allLocales}
        locale='ja'
        timeZone='Asia/Tokyo'
        headerToolbar={{ end: 'prev,today,next' }}
        buttonText={{ today: '今月' }}
        events={reservations}
        eventClick={handleEventClick}
        dayCellContent={(event) => (event.dayNumberText = event.dayNumberText.replace('日', ''))}
      />
      <>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size='lg'
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              入力フォーム
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InfoForm {...props}/>
            {/* <InfoForm info={props.info} timeZoneList={props.timeZoneList} ageList={props.ageList} prefectureList={props.prefectureList} setInfo={props.setInfo} setAllInfo={props.setAllInfo} setPage={props.setPage}/> */}
          </Modal.Body>
        </Modal>
      </>
    </>
  )
}

export default Calendar
