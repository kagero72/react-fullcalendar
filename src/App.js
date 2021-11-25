import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";

import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Calendar from "./components/calendar";
import InfoForm from "./components/infoform";
import Confirm from "./components/confirm";

function App() {

  const [page, setPage] = useState(0)
  const [date, setDate] = useState(new Date())

  const navigate = useNavigate();

  const [info, setInfo] = useState({
    date: new Date(),
    time: 0,
    people: [0,0,0,0,0,0],
    prefecture: 0,
    name: "",
    furigana: "",
    tel: "",
    email: ""
  });

  const timeZoneList = [
    "選択してください",
    "10:00~11:00",
    "11:30~12:30",
    "13:00~14:00",
    "14:30~15:30"
  ]

  const ageList = ["大人", "シルバー（70〜）", "小学生", "〜小学生", "〜2歳", "0歳"]

  const prefectureList = [
    "選択してください",
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県"
  ]

  const SelectDate = (date) => { 
    setDate(date)
    SetPage('infoform')
  }

  const GoConfirm = (info) => {
    setInfo(info)
    SetPage('confirm')
  }

  const SetPage = (page) => {
    navigate('/' + page)
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Calendar selectDate={SelectDate}></Calendar>}
        />
        <Route
          path="/infoform"
          element={<InfoForm date={date} info={info} timeZoneList={timeZoneList} ageList={ageList} prefectureList={prefectureList} setPage={SetPage} goConfirm={GoConfirm}></InfoForm>}
        />
        <Route
          path="/confirm"
          element={<Confirm date={date} info={info} timeZoneList={timeZoneList} ageList={ageList} prefectureList={prefectureList} setPage={SetPage}></Confirm>}
        />
      </Routes>
    </>
  );
}

export default App;
