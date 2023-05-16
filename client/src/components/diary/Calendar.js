import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { DataResponse } from './DiaryCheck'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CalendarPage = ({ diaries }) => {
  const [value, onChange] = useState(new Date())
  const navigate = useNavigate()

  const newDiary = {
    // json-server에서 post 요청을 위해 사용하는 목업 데이터
    id: 4,
    userDate: '2023-05-15',
    memo: '',
    diaryStatus: '',
    meal: [],
    standardIntake: [
      {
        carbohydrate: 225,
        protein: 60,
        fat: 47,
        kcal: 2200,
        sugar: 25,
      },
    ],
    calcul: [
      {
        carbohydrate: 0,
        protein: 0,
        fat: 0,
        kcal: 0,
        sugar: 0,
      },
    ],
    recipe: [],
    comment: '',
  }

  const onChangeHandler = (date) => {
    //  브라우저의 기본 동작 때문에 선택한 날짜가 한국 표준시로 인해 하루 전으로 인식되서 코드 추가
    const selectedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const dateString = selectedDate.toISOString().split('T')[0]
    const diaryData = diaries.data.find(
      (diary) => diary.userDate === dateString
    )
    if (diaryData) {
      // 해당 날짜에 대한 일기 데이터가 이미 존재하는 경우
      navigate(`/diaries/${diaryData.id}`)
    } else {
      // 해당 날짜에 대한 일기 데이터가 없는 경우
      axios
        .post('http://localhost:4000/diary', newDiary)
        .then((res) => {
          console.log(res)
          // 여기서 diaries 상태를 최신화 해줘야할듯
          navigate(`/diaries/${diaryData.id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // 이모지를 사용하게 되면 쓸 코드
  const dateWithEmoji = {
    '2023-05-12': '\u{1F600}',
    '2023-05-13': '\u{1F62D}',
    '2023-05-16': '\u{1F62D}',
  }
  const tileContent = ({ date }) => {
    const a = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const formattedDate = a.toISOString().split('T')[0]
    return <div className="emoji">{dateWithEmoji[formattedDate]}</div>
  }

  return (
    <Container>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
        onClickDay={onChangeHandler}
        tileContent={tileContent}
      />
      <h1>
        {new Date(value).toLocaleDateString('ko', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h1>
    </Container>
  )
}

const Container = styled.div`
  .react-calendar {
    width: 550px;
    border: 0.4px solid var(--color-light-gray);
    border-radius: 15px;
  }

  .react-calendar__navigation {
    // 달력 년/월 표시 글씨 커스텀
    margin: 0;

    button:hover {
      background: none;
    }

    button:nth-child(3) {
      font-size: 18px;
      color: var(--color-dark-gray);
      font-family: 'Pretendard', sans-serif;
    }
  }

  .react-calendar__month-view__weekdays {
    font-size: 10px;
    /* text-align: left; */
    font-weight: 400;
    color: var(--color-dark-gray);
    // 달력 요일 표시 커스텀
    div {
      height: 30px;
      border: 0.4px solid var(--color-light-gray);
      border-right: none;
    }

    div:first-child {
      border-left: none;
    }
  }

  .react-calendar__month-view__days {
    button {
      position: relative;
      display: flex;
      height: 90px;
      border-right: 0.1px solid var(--color-light-gray);
      border-bottom: 0.1px solid var(--color-light-gray);
      font-size: 18px;
      font-family: 'Pretendard', sans-serif;
      font-weight: 400;
    }

    button:last-child {
      border-radius: 0px 0px 15px 0px;
    }

    button:nth-child(29) {
      border-radius: 0px 0px 0px 15px;
    }
  }

  .react-calendar__tile--now {
    background-color: var(--color-secondary);
    color: var(--color-white);
  }

  .react-calendar__tile--now:enabled:hover {
    background-color: var(--color-primary);
  }

  .react-calendar__tile--active {
    background: var(--color-point) !important;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    background: #e9e9e9;
    opacity: 0.5;
  }

  .emoji {
    padding: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    font-size: 4.6rem;
  }

  h1 {
    margin-top: 1rem;
  }
`

export default CalendarPage
