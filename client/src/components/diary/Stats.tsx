import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
  max-width: 250px;
  border: 1px solid var(--color-light-gray);
  border-radius: 15px;
  padding: 1rem;

  h3 {
    font-size: 2.4rem;
    text-align: center;
    margin-top: 1rem;
  }

  .detail__Kcal {
    font-family: 'yg-jalnan';
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .pie__container {
    position: relative;
    display: inline;
    left: -3.5rem;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }

  .pie__detail {
    position: relative;
    bottom: 8rem;
  }

  .detail__container {
    font-size: 13px;
    border-radius: 7px;
    padding: 2rem;
    background-color: #fff0d8;
  }

  .nutrient__list {
    width: 150px;
    display: flex;
    white-space: nowrap;

    p {
      margin-bottom: 0.9rem;
    }

    p:first-child {
      flex: 6;
    }

    p:nth-child(2) {
      font-weight: 600;
      flex: 2;
    }

    p:last-child {
      color: #c50000;
      font-weight: 600;
      flex: 2;
      justify-items: center;
    }
  }
`

const Stats = () => {
  const data = [
    {
      id: '탄수화물',
      label: '탄수화물',
      value: 50,
    },
    {
      id: '단백질',
      label: '단백질',
      value: 30,
    },
    {
      id: '지방',
      label: '지방',
      value: 10,
    },
  ]
  return (
    <StatsWrapper>
      <h3>지난주 통계</h3>
      <div className="pie__container">
        <ResponsivePie
          data={data}
          margin={{ top: 0, right: 70, bottom: 70, left: 70 }}
          padAngle={2}
          activeOuterRadiusOffset={6}
          innerRadius={0.01} // chart 중간 빈공간 반지름
          colors={['#14B8A6', '#F59E0B', '#FACC15']} // 커스텀하여 사용할 때
          enableArcLinkLabels={false}
        />
      </div>
      <div className="pie__detail">
        <p className="detail__Kcal">16,000 Kcal</p>
        <ul className="detail__container">
          <li className="nutrient__list">
            <p>탄수화물</p>
            <p>50%</p>
            <p>과다</p>
          </li>
          <li className="nutrient__list">
            <p>단백질</p>
            <p>5%</p>
            <p>부족</p>
          </li>
          <li className="nutrient__list">
            <p>지방</p>
            <p>10%</p>
            <p>보통</p>
          </li>
        </ul>
      </div>
    </StatsWrapper>
  )
}

export default Stats
