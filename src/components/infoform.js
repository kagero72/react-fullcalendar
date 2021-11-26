import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Row, Col, Form, FloatingLabel } from 'react-bootstrap';

const InfoForm = (props) => {

  const [peopleSum, setPeopleSum] = useState(0)

  useEffect(() => {
    updatePeopleSum()
  }, [props.info.people]);
  
  const updatePeopleSum = () => {
    let sum = 0
    props.info.people.forEach(value => sum += Number(value))
    setPeopleSum(sum)
  }

  const getIsPeopleOver = () => {
    return peopleSum >= 20
  }

  const getIsOnlyChild = () => {
    return peopleSum > 0
    && (props.info.people[0] == 0 || props.info.people[0] === undefined)
    && (props.info.people[1] == 0 || props.info.people[1] === undefined)
  }

  const onSubmit = () => {
    props.setPage('confirm')
  }

  const onReset = () => {

    // リセット確認
    if(!window.confirm("本当に入力内容をリセットしますか？")) return

    // フォーム内の値をリセット
    document.getElementById("time-select").value = 0
    const peopleSelectList = document.getElementsByClassName("people-select")
    for(let i = 0; i < peopleSelectList.length; i++) peopleSelectList[i].value = 0
    document.getElementById("name-control").value = ""
    document.getElementById("furigana-control").value = ""
    document.getElementById("prefecture-select").value = 0
    document.getElementById("tel-control").value = ""
    document.getElementById("email-control").value = ""

    props.setAllInfo({
      date: new Date(),
      time: 0,
      people: [],
      prefecture: 0,
      name: "",
      furigana: "",
      tel: "",
      email: ""
      }
    )

    // console.log(props.info.people)
    updatePeopleSum()
  }

  return(
    <>
      <Container>
        <Button
         className="back-button"
         variant="outline-secondary"
         size="sm"
         onClick={()=>props.setPage('')}
        >
          日付選択へ
        </Button>

        <Form>
          <Form.Label className="mt-3 mb-2">
            時間
          </Form.Label><br/>
          <>
            {props.info.date.getFullYear() + "年" + (props.info.date.getMonth() + 1) + "月" + props.info.date.getDate() + "日"}
          </>
          <FloatingLabel label="時間帯" className="mb-2">
            <Form.Select
              id="time-select"
              className={"time-select " + (props.info.time == 0 ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('time', event.target.value)}
              placeholder="time"
              defaultValue={props.info.time}
            >
              {
                props.timeZoneList.map((value, index) =>
                  <option key={index} value={index}>{value}</option>
                )
              }
            </Form.Select>              
          </FloatingLabel>

          <Form.Label className="mt-3 mb-2">
            人数
          </Form.Label>
          <Row>
            {
              props.ageList.map((value, index) =>
                <>
                  <FloatingLabel key={index} label={value} as={Col} sm={4} className="mb-2">
                    <Form.Select
                      className={"people-select " + ((index >= props.info.people.length || props.info.people[index] == 0 || props.info.people[index] === undefined) ? "bg-white" : "bg-green")}
                      onChange={event => {
                        let people = props.info.people
                        people[index] = event.target.value
                        props.setInfo('people', people)
                        updatePeopleSum()
                      }}
                      defaultValue={props.info.people[index]}
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
              id="name-control"
              className={"name-control " + (props.info.name === "" ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('name', event.target.value)}
              placeholder="name"
              defaultValue={props.info.name}
            />
          </FloatingLabel>
          <FloatingLabel label="ふりがな" className="mb-2">
            <Form.Control
              type="text"
              id="furigana-control"
              className={"furigana-control " + (props.info.furigana === "" ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('furigana', event.target.value)}
              placeholder="furigana"
              defaultValue={props.info.furigana}
            />
          </FloatingLabel>
          <FloatingLabel label="お住まいの都道府県" className="mb-2">
            <Form.Select
              id="prefecture-select"
              className={"prefecture-select " + (props.info.prefecture == 0 ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('prefecture', event.target.value)}
              placeholder="prefecture"
              defaultValue={props.info.prefecture}
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
              id="tel-control"
              type="tel"
              className={"tel-control " + (props.info.tel === "" ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('tel', event.target.value)}
              placeholder="tel"
              defaultValue={props.info.tel}
            />
          </FloatingLabel>
          <FloatingLabel label="メールアドレス" className="mb-2">
            <Form.Control
              id="email-control"
              type="email"
              className={"email-control " + (props.info.email === "" ? "bg-white" : "bg-green")}
              onChange={event => props.setInfo('email', event.target.value)}
              placeholder="email"
              defaultValue={props.info.email}
            />
          </FloatingLabel>
          
          <ButtonGroup className="mt-2 mb-2 back-button">
            <Button
              variant="primary"
              size="lg"
              onClick={onSubmit}
              disabled={props.info.time == 0 || peopleSum === 0 || props.info.name === "" || props.info.furigana === "" || props.info.prefecture == 0 || props.info.tel === "" || props.info.email === "" || getIsPeopleOver() || getIsOnlyChild()}
              >
              確認画面へ
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onReset}
              >
              入力内容をリセット
            </Button>
          </ButtonGroup>
          <br/>

          {/* <a href="#" className="m-2">会員登録済みの方はこちら</a> */}
        </Form>
      </Container>
    </>
  );
}

export default InfoForm;