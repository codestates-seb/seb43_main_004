import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { DataResponse } from '../../pages/DiaryCheck'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from '../../utils/Cookie'

const CalendarPage = ({ diaries }: { diaries: DataResponse }) => {
  const [value, onChange] = useState(new Date())
  const navigate = useNavigate()

  const onChangeHandler = (date: Date) => {
    //  브라우저의 기본 동작 때문에 선택한 날짜가 한국 표준시로 인해 하루 전으로 인식되서 코드 추가
    const selectedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const dateString = selectedDate.toISOString().split('T')[0]
    const isPreviousMonth = date.getMonth() !== value.getMonth()

    const diaryData = diaries.data.find(
      (diary) => diary.userDate === dateString
    )
    if (diaryData) {
      navigate(`/diaries/${diaryData.diaryId}`)
    } else if (!isPreviousMonth) {
      // 해당 날짜에 대한 일기 데이터가 없는 경우
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/diaries/write`,
          {
            userDate: `${dateString}`,
            memo: '',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
              Authorization: `Bearer ${getCookie('access')}`,
            },
          }
        )
        .then((res) => {
          navigate(`/diaries/${res.data.diaryId}`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // 이모지를 사용하는 법
  // const dateWithEmoji = {
  //   '2023-05-12': '\u{1F600}',
  //   '2023-05-13': '\u{1F62D}',
  //   '2023-05-16': '\u{1F62D}',
  // }

  const dateWithEmoji: { [key: string]: string } = {}

  diaries.data.forEach((item) => {
    dateWithEmoji[item.userDate] = item.diaryStatus
  })

  const tileContent = ({ date }: { date: Date }) => {
    const nowTime = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const formattedDate = nowTime.toISOString().split('T')[0]
    return <div className="emoji">{dateWithEmoji[formattedDate]}</div>
  }

  return (
    <Container>
      <Calendar
        onChange={(value) => onChange(value as Date)}
        value={value}
        locale="en-US"
        onClickDay={onChangeHandler}
        tileContent={tileContent}
      />
      {/* <h1>
        {new Date(value).toLocaleDateString('ko', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h1> */}
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
  // 아이폰 기본 스타일링으로 날짜타일의 글씨가 파란색으로 변하는 현상을 수정하기 위한 코드
  .calender-date-tile {
    color: inherit;
    text-decoration: none;
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

  @media (max-width: 850px) {
    .react-calendar {
      width: 420px;
      border: 0.4px solid var(--color-light-gray);
      border-radius: 15px;
      .emoji {
        font-size: 3.6rem;
      }
    }
    .react-calendar__month-view__days {
      button {
        height: 70px;
        font-size: 13px;
        font-family: 'Pretendard', sans-serif;
        font-weight: 400;
      }
    }
  }

  @media (max-width: 710px) {
    .react-calendar {
      width: 320px;
      border: 0.4px solid var(--color-light-gray);
      border-radius: 15px;
      .emoji {
        font-size: 2.2rem;
      }
    }
    .react-calendar__month-view__days {
      button {
        height: 55px;
        font-size: 10px;
        font-family: 'Pretendard', sans-serif;
        font-weight: 400;
      }
    }
  }
`

export default CalendarPage
