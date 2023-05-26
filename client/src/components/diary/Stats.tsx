import React from 'react'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
import { DataResponse } from '../../pages/DiaryCheck'

const Stats = ({ diaries }: { diaries: DataResponse }) => {
  // 백엔드 데이터가 만들어지면 any에서  DataResponse로 변경 에정
  const { weekList, standardIntakes } = diaries

  const intake = weekList && weekList[0] // 지난주 섭취량
  const standardIntake = standardIntakes && standardIntakes[0] // 평균섭취량

  const percentIntake = (nutrient: string) => {
    return (
      (intake?.[nutrient] / 7 / standardIntake?.[nutrient]) *
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
      id: 'carbohydrate',
      label: '탄수화물',
      value: `${intake.carbohydrate.toFixed(0)}`,
      color: '#14B8A6',
    },
    {
      id: 'protein',
      label: '단백질',
      value: `${intake.protein.toFixed(0)}`,
      color: '#F59E0B',
    },
    {
      id: 'fat',
      label: '지방',
      value: `${intake.fat.toFixed(0)}`,
      color: '#FACC15',
    },
    {
      id: 'sugar',
      label: '당류',
      value: `${intake.sugar.toFixed(0)}`,
      color: '#3B82F6',
    },
    {
      id: 'salt',
      label: '나트륨',
      value: `${(intake.salt / 1000).toFixed(2)}`,
      color: '#6366F1',
    },
  ]

  const filteredData = data.filter((item) => {
    return Number(item.value) > 1
  })

  // 통계부분
  const renderNutrientListItem = (nutrient: Nutrient) => {
    const nutrientIntake = intake?.[nutrient.id]
    const nutrientPercentIntake = percentIntake(nutrient.id)
    const nutrientClassName = getSugarClassName(nutrient.id)

    const nutrientStatus =
      Number(nutrientPercentIntake) > 120
        ? '과다'
        : Number(nutrientPercentIntake) < 80
        ? '부족'
        : '적정'

    return (
      <li className="nutrient__list" key={nutrient.id}>
        <div className="flex">
          <div
            className="stats__color"
            style={{ backgroundColor: nutrient.color }}
          ></div>
          <p>{nutrient.label}</p>
        </div>
        <div className="flex">
          <p>{nutrientPercentIntake}%</p>
          <p className={nutrientClassName}>{nutrientStatus}</p>
        </div>
      </li>
    )
  }

  const CustomTooltip = ({ datum }: { datum: any }) => (
    <TooltipWrapper>
      <strong>{datum.label}</strong>: {datum.value}g
    </TooltipWrapper>
  )

  const hasData = Object.values(weekList[0]).some((value) => value !== 0)

  return (
    <StatsWrapper>
      <h3>지난주 통계</h3>
      {hasData && filteredData.length > 0 ? (
        <>
          <div className="pie__container">
            <ResponsivePie
              data={filteredData}
              margin={{ top: 0, right: 70, bottom: 70, left: 70 }}
              padAngle={0.8}
              activeOuterRadiusOffset={6}
              innerRadius={0.01} // chart 중간 빈공간 반지름
              colors={(datum) => datum.data.color}
              enableArcLinkLabels={false}
              sortByValue={true}
              tooltip={CustomTooltip}
            />
          </div>
          <div className="pie__detail">
            <p className="detail__Kcal">{`${intake?.sumKcal} Kcal`}</p>
            <ul className="detail__container">
              {data.map((nutrient) => renderNutrientListItem(nutrient))}
            </ul>
          </div>
        </>
      ) : (
        <div className="no__result__data">
          <div className="round__gray"></div>
          <p className="detail__Kcal">{`${intake?.sumKcal} Kcal`}</p>
          {filteredData.length === 0 ? (
            <p className="no__length">
              지난주 식단기록이 존재하지만 충분하지 않아 통계가 불가능합니다.
              <br />
              <br /> 꾸준한 기록을 통해 통계를 제공받아
              <br /> 섭취한 영양성분을 확인하세요!
            </p>
          ) : (
            <p className="nth__length">
              지난주 식단기록이 존재하지 않습니다.
              <br /> 꾸준한 기록을 통해 통계를 제공받아
              <br /> 섭취한 영양성분을 확인하세요!
            </p>
          )}
        </div>
      )}
    </StatsWrapper>
  )
}

interface Nutrient {
  id: string
  label: string
  value: string
  color: string
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
    justify-content: space-between;

    p {
      margin-bottom: 0.9rem;
    }

    p:first-child {
      flex: 8;
    }

    p:nth-child(2) {
      font-weight: 500;
      flex: 1;
    }

    p:last-child {
      font-weight: 700;
      flex: 1;
      justify-items: center;
      margin-left: 0.5rem;
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

    .stats__color {
      position: relative;
      top: 3px;
      width: 8px;
      height: 8px;
      margin-right: 1rem;
      border-radius: 50%;
    }

    .flex {
      display: flex;
    }
  }

  .no__result__data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    .round__gray {
      margin: 3rem;
      justify-self: center;
      width: 160px;
      height: 160px;
      background-color: var(--color-light-gray);
      border-radius: 50%;
    }

    .no__length {
      width: 200px;
    }

    p:last-child {
      margin-top: 2rem;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
  }
  @media (max-width: 850px) {
    h3 {
      font-size: 22px;
    }

    .pie__container {
      width: 250px;
      height: 250px;
      left: -1rem;
    }

    .detail__container {
      font-size: 12px;
      padding: 1.5rem;
    }

    .no__result__data {
      width: 250px;
      .round__gray {
        width: 140px;
        height: 140px;
      }
      p:last-child {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 710px) {
    h3 {
      font-size: 18px;
    }
    .no__result__data {
      width: 180px;
      .round__gray {
        width: 120px;
        height: 120px;
      }
      p:last-child {
        font-size: 12px;
      }
    }
  }
`

const TooltipWrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
`

export default Stats
