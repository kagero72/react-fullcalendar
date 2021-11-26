import { Container, Button, ButtonGroup, ListGroup } from 'react-bootstrap';

const Confirm = (props) => {

  const onSubmit = () => {

  }

  return(
    <>
      <Container>
        <ListGroup>
          <ListGroup.Item>日付：　　　　　　{props.info.date.getFullYear() + '年' + (props.info.date.getMonth() + 1) + '月' + props.info.date.getDate() + '日'}</ListGroup.Item>
          <ListGroup.Item>時間：　　　　　　{props.timeZoneList[props.info.time]}</ListGroup.Item>
          <ListGroup.Item>人数：　　　　　　
            {
              props.ageList.map((value, index) => 
                (index < props.info.people.length && props.info.people[index] !== 0 && props.info.people[index] !== undefined) &&
                <>{value} {props.info.people[index]}名　</>
              )
            }
          </ListGroup.Item>
          <ListGroup.Item>お名前：　　　　　{props.info.name}</ListGroup.Item>
          <ListGroup.Item>ふりがな：　　　　{props.info.furigana}</ListGroup.Item>
          <ListGroup.Item>都道府県：　　　　{props.prefectureList[props.info.prefecture]}</ListGroup.Item>
          <ListGroup.Item>お電話番号：　　　{props.info.tel}</ListGroup.Item>
          <ListGroup.Item>メールアドレス：　{props.info.email}</ListGroup.Item>
        </ListGroup>
        <br/>
        <ButtonGroup>
          <Button variant='primary' size='lg' onClick={onSubmit}>確認</Button>
          <Button variant='secondary' size='lg' onClick={()=>props.setPage('infoform')}>変更</Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

export default Confirm;