import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Calendar from './components/calendar';
import Confirm from './components/confirm';

function App() {

  const navigate = useNavigate()

  const [info, setInfo] = useState({
    date: new Date('2000-01-01'),
    time: '',
    people: [],
    prefecture: '',
    name: '',
    furigana: '',
    tel: '',
    email: ''
  }, [])

  const [vacantList, setVacantList] = useState({
    '2000-01-01': {
      'vacant': '空きあり',
      'zones': {}
    },
    '2021-11-27': {
      'vacant': '空きあり',
      'zones': {
        '1': 20,
        '2': 30,
        '3': 30,
        '4': 30,
        '5': 30,
        '6': 30,
        '7': 30,
        '8': 30,
        '9': 30,
        '10': 30,
        '11': 30
      }
    },
    '2021-11-29': {
      'vacant': '空きあり',
      'zones': {
        '1': 50,
        '2': 30,
        '3': 50,
        '4': 5,
        '5': 20,
        '6': 50,
        '7': 0,
        '8': 50,
        '9': 50,
        '10': 50,
        '11': 50
      }
    },
    '2021-11-30': {
      'vacant': '空きあり',
      'zones': {
        '1': 40,
        '2': 40,
        '3': 21,
        '4': 40,
        '5': 40,
        '6': 40,
      }
    }
  })

  const [timeZoneList, setTimeZoneList] = useState({
    '1': '10:00 - 11:00 の部',
    '2': '10:30 - 11:30 の部',
    '3': '11:00 - 12:00 の部',
    '4': '11:30 - 12:30 の部',
    '5': '12:00 - 13:00 の部',
    '6': '12:30 - 13:30 の部',
    '7': '13:00 - 14:00 の部',
    '8': '13:30 - 14:30 の部',
    '9': '14:00 - 15:00 の部',
    '10': '14:30 - 15:30 の部',
    '11': '15:00 - 16:00 の部'
  })

  const [ageList, setAgeList] = useState({
    '1': '大人（中学生以上）',
    '2': 'シルバー（７０歳以上）',
    '3': '小学生',
    '4': '３歳以上小学生未満',
    '5': '１歳、２歳',
    '6': '０歳児'
  })

  const [prefectureList, setPrefectureList] = useState({
    '1': '北海道',
    '2': '青森県',
    '3': '岩手県',
    '4': '宮城県',
    '5': '秋田県',
    '6': '山形県',
    '7': '福島県',
    '8': '茨城県',
    '9': '栃木県',
    '10': '群馬県',
    '11': '埼玉県',
    '12': '千葉県',
    '13': '東京都',
    '14': '神奈川県',
    '15': '新潟県',
    '16': '富山県',
    '17': '石川県',
    '18': '福井県',
    '19': '山梨県',
    '20': '長野県',
    '21': '岐阜県',
    '22': '静岡県',
    '23': '愛知県',
    '24': '三重県',
    '25': '滋賀県',
    '26': '京都府',
    '27': '大阪府',
    '28': '兵庫県',
    '29': '奈良県',
    '30': '和歌山県',
    '31': '鳥取県',
    '32': '島根県',
    '33': '岡山県',
    '34': '広島県',
    '35': '山口県',
    '36': '徳島県',
    '37': '香川県',
    '38': '愛媛県',
    '39': '高知県',
    '40': '福岡県',
    '41': '佐賀県',
    '42': '長崎県',
    '43': '熊本県',
    '44': '大分県',
    '45': '宮崎県',
    '46': '鹿児島県',
    '47': '沖縄県'
  })

  // useEffect(() => {
  //   axios.get('/api/bizday').then(res => {
  //     setVacantList(res.data)
  //   }).catch(err => console.log(err))

  //   axios.get('/api/timelist').then(res => {
  //     setTimeZoneList(res.data)
  //   }).catch(err => console.log(err))

  //   axios.get('/api/agelist').then(res => {
  //     setAgeList(res.data)
  //   }).catch(err => console.log(err))

  //   axios.get('/api/preflist').then(res => {
  //     setPrefectureList(res.data)
  //   }).catch(err => console.log(err))
  // }, [])

  const getFormattedDate = (date) => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
  }
    
  const SetInfo = (item, value) => {
    setInfo({ ...info, [item]: value })
  }
  
  const SetAllInfo = (info) => {
    setInfo(info)
  }

  const SetPage = (page) => {
    navigate('/' + page)
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Calendar info={info} vacantList={vacantList} timeZoneList={timeZoneList} ageList={ageList} prefectureList={prefectureList} setInfo={SetInfo} setAllInfo={SetAllInfo} setPage={SetPage} getFormattedDate={getFormattedDate}></Calendar>}
        />
        <Route
          path='/confirm'
          element={<Confirm info={info} timeZoneList={timeZoneList} ageList={ageList} prefectureList={prefectureList} setPage={SetPage} getFormattedDate={getFormattedDate}></Confirm>}
        />
      </Routes>
    </>
  )
}

export default App
