import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
// import { DataResponse } from './DiaryCheck'

const Stats = ({ diaries }: any) => {
  // 백엔드 데이터가 만들어지면 any에서  DataResponse로 변경 에정
  const { weekList, standardIntake } = diaries
  const intake = weekList && weekList[0] // 지난주 섭취량
  const standardIntakes = standardIntake && standardIntake[0] // 평균섭취량
  console.log(weekList)

  const percentIntake = (nutrient: string) => {
    return (
      (intake?.[nutrient] / 7 / standardIntakes?.[nutrient]) *
      100
    ).toFixed(0)
  }

  const getSugarClassName = (nutrient: string) => {
    if (Number(percentIntake(nutrient)) > 120) {
      return 'excessive'
    } else if (Number(percentIntake(nutrient)) < 80) {
      return 'deficient'
    } else {
      return 'appropriate'
    }
  }

  const data = [
    {
      id: '탄수화물',
      label: '탄수화물',
      value: `${intake.carbohydrate}`,
    },
    {
      id: '단백질',
      label: '단백질',
      value: `${intake.protein}`,
    },
    {
      id: '지방',
      label: '지방',
      value: `${intake.fat}`,
    },
    {
      id: '당류',
      label: '당류',
      value: `${intake.sugar}`,
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
        <p className="detail__Kcal">{`${intake?.kcal} Kcal`}</p>
        <ul className="detail__container">
          <li className="nutrient__list">
            <p>탄수화물</p>
            <p>{percentIntake('carbohydrate')}%</p>
            <p className={getSugarClassName('carbohydrate')}>
              {Number(percentIntake('carbohydrate')) > 120
                ? '과다'
                : Number(percentIntake('carbohydrate')) < 80
                ? '부족'
                : '적정'}
            </p>
          </li>
          <li className="nutrient__list">
            <p>단백질</p>
            <p>{percentIntake('protein')}%</p>
            <p className={getSugarClassName('protein')}>
              {Number(percentIntake('protein')) > 120
                ? '과다'
                : Number(percentIntake('protein')) < 80
                ? '부족'
                : '적정'}
            </p>
          </li>
          <li className="nutrient__list">
            <p>지방</p>
            <p>{percentIntake('fat')}%</p>
            <p className={getSugarClassName('fat')}>
              {Number(percentIntake('fat')) > 120
                ? '과다'
                : Number(percentIntake('fat')) < 80
                ? '부족'
                : '적정'}
            </p>
          </li>
          <li className="nutrient__list">
            <p>당</p>
            <p>{percentIntake('sugar')}%</p>
            <p className={getSugarClassName('sugar')}>
              {Number(percentIntake('sugar')) > 120
                ? '과다'
                : Number(percentIntake('sugar')) < 80
                ? '부족'
                : '적정'}
            </p>
          </li>
        </ul>
      </div>
    </StatsWrapper>
  )
}

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
      font-weight: 500;
      flex: 2;
      margin-right: 0.4rem;
    }

    p:last-child {
      font-weight: 700;
      flex: 2;
      justify-items: center;
    }

    .excessive {
      color: #c50000;
    }

    .deficient {
      color: #f2ae1c;
    }

    .appropriate {
      color: #4c7031;
    }
  }
`

export default Stats
