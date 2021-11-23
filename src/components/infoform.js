import React, { useState } from "react";
import { Button, Container, Row, Col, Form, FloatingLabel, FormControl } from 'react-bootstrap';

const InfoForm = (props) => {

  const [time, setTime] = useState(0);
  const [people, setPeople] = useState([0,0,0,0,0,0]);
  const [peopleSum, setPeopleSum] = useState(0);
  const [prefecture, setPrefecture] = useState(0);
  const [name, setName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  
  const onChangeTime = (event) => {
    const value = event.target.value;
    setTime(Number(value));
  }
  const onChangePeople = (event, index) => {
    const value = event.target.value;
    let tmp = people;
    tmp[index] = Number(value);
    setPeople(tmp);
    updatePeopleSum()
  }
  const onChangePreference = (event) => {
    const value = event.target.value;
    setPrefecture(Number(value));
  }
  const onChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  }
  const onChangeFurigana = (event) => {
    const value = event.target.value;
    console.log(furigana)
    setFurigana(value);
  }
  const onChangeTel = (event) => {
    const value = event.target.value;
    setTel(value);
  }
  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  }
  
  const updatePeopleSum = () => {
    let sum = 0;
    people.forEach(value => sum += value)
    setPeopleSum(sum);
  }

  const getIsPeopleOver = () => {
    return peopleSum >= 20
  }

  const getIsOnlyChild = () => {
    return peopleSum > 0 && people[0] == 0 && people[1] == 0
  }

  const onSubmit = () => {
    let info = {
      time: time,
      people: people,
      prefecture: prefecture,
      name: name,
      furigana: furigana,
      tel: tel,
      email: email
    }
    props.goConfirm(info)
  }

  return(
    <>
      <Container>
        <Button
         className="back-button"
         variant="outline-secondary"
         size="sm"
         onClick={()=>props.setPage(0)}
        >
          日付選択へ
        </Button>

        <Form>
          <Form.Label className="mt-3 mb-2">
            時間情報
          </Form.Label><br/>
          <>{props.date.getFullYear() + "年" + (props.date.getMonth() + 1) + "月" + props.date.getDate() + "日"}</>
          <FloatingLabel label="時間帯" className="mb-2">
            <Form.Select
              className={"time-select " + (time === 0 ? "bg-white" : "bg-green")}
              onChange={event => onChangeTime(event)}
              placeholder="time"
            >
              {
                props.timeZoneList.map((value, index) =>
                  <option key={index} value={index}>{value}</option>
                )
              }
            </Form.Select>              
          </FloatingLabel>

          <Form.Label className="mt-3 mb-2">
            人数情報
          </Form.Label>
          <Row>
            {
              props.ageList.map((value, index) =>
                <>
                  <FloatingLabel key={index} label={value} as={Col} sm={4} className="mb-2">
                    <Form.Select
                      className={"people-select " + (people[index] === 0 ? "bg-white" : "bg-green")}
                      onChange={event => onChangePeople(event, index)}
                    >
                      {
                        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((num, index) =>
                          <option key={index} value={num}>{num}</option>
                        )
                      }
                    </Form.Select>
                  </FloatingLabel>
                </>
              )
            }
          </Row>
          {
            <div className="ta-l">
              合計：{peopleSum}名
              {getIsPeopleOver() && <><br/><strong className="tc-r">20名様以上のご予約はお電話にてお願いいたします。</strong></>}
              {getIsOnlyChild() && <><br/><strong className="tc-r">中学生未満のお子様のみでのご来園は、お断りさせていただいております。</strong></>}
            </div>
          }

          <Form.Label className="mt-3 mb-2">
            お客様情報
          </Form.Label>
          <FloatingLabel label="お名前" className="mb-2">
            <Form.Control
              type="text"
              className={"name-control " + (name === "" ? "bg-white" : "bg-green")}
              onChange={event => onChangeName(event)}
              placeholder="name"
            />
          </FloatingLabel>
          <FloatingLabel label="ふりがな" className="mb-2">
            <FormControl
              type="text"
              className={"furigana-control " + (furigana === "" ? "bg-white" : "bg-green")}
              onChange={event => onChangeFurigana(event)}
              placeholder="furigana"
            />
          </FloatingLabel>
          <FloatingLabel label="お住まいの都道府県" className="mb-2">
            <Form.Select
              className={"prefecture-select " + (prefecture === 0 ? "bg-white" : "bg-green")}
              onChange={event => onChangePreference(event)}
              placeholder="prefecture"
            >
              {
                props.prefectureList.map((value, index) =>
                  <option key={index} value={index}>{value}</option>
                )
              }
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label="お電話番号" className="mb-2">
            <Form.Control
              type="tel"
              className={"tel-control " + (tel === "" ? "bg-white" : "bg-green")}
              onChange={event => onChangeTel(event)}
              placeholder="tel"
            />
          </FloatingLabel>
          <FloatingLabel label="メールアドレス" className="mb-2">
            <Form.Control
              type="email"
              className={"email-control " + (email === "" ? "bg-white" : "bg-green")}
              onChange={event => onChangeEmail(event)}
              placeholder="email"
            />
          </FloatingLabel>

          <Button
            variant="primary"
            size="lg"
            className="m-2"
            onClick={onSubmit}
            disabled={time === 0 || peopleSum === 0 || name === "" || furigana === "" || prefecture === 0 || tel === "" || email === "" || getIsPeopleOver() || getIsOnlyChild()}
          >
            確認画面へ
          </Button><br/>

          <a href="#" className="m-2">会員登録済みの方はこちら</a>
        </Form>
      </Container>
    </>
  );
}

export default InfoForm;