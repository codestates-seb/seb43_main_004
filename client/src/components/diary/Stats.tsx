import React from 'react'
import styled from 'styled-components'

const StatsWrapper = styled.div`
  margin-left: 30px;
  min-width: 200px;
  border: 1px solid var(--color-light-gray);
  border-radius: 15px;
  padding: 1rem;

  h3 {
    font-size: 2.4rem;
    text-align: center;
    margin-top: 1rem;
  }
`

const Stats = () => {
  return (
    <StatsWrapper>
      <h3>지난주 통계</h3>
    </StatsWrapper>
  )
}

export default Stats
