import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

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
      border: 0.1px solid var(--color-light-gray);
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

const CalendarPage = () => {
  const [value, onChange] = useState(new Date())

  const dateWithEmoji = {
    '2023-05-10': '\u{1F600}',
    '2023-05-07': '\u{1F62D}',
  }

  console.log(dateWithEmoji)

  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0]
    return <div className="emoji">{dateWithEmoji[formattedDate]}</div>
  }

  return (
    <Container>
      <Calendar
        onChange={onChange}
        value={value}
        locale="en-US"
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

export default CalendarPage
