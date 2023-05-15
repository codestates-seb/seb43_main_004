import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const StyledIntakeCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  button {
    font-size: ${({ theme }) => theme.fontSize.larger};
  }

  input {
    border: 1px solid ${({ theme }) => theme.color.darkGray};
    border-radius: 0.6rem;
    padding: 1rem;
    text-align: center;
    font-weight: 500;
  }

  @media ${({ theme }) => theme.device.mobile} {
    gap: 0;

    input {
      width: 50%;
    }
  }
`

interface IntakeProps {
  standard: number
}

const IntakeCounter = (props: IntakeProps) => {
  const { standard } = props

  const [intake, setIntake] = useState(standard)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력가능
    if (!isNaN(Number(e.target.value))) {
      setIntake(Number(e.target.value))
    }
  }

  const handleIncrease = () => {
    setIntake(intake + 100)
  }
  const handleDecrease = () => {
    if (intake - 100 >= 0) {
      setIntake(intake - 100)
    }
  }

  return (
    <StyledIntakeCounter>
      <button type="button" className="decrease" onClick={handleDecrease}>
        <span className="material-icons-round">remove</span>
      </button>
      <input type="text" value={intake} onChange={(e) => handleOnChange(e)} />
      <button type="button" className="increase" onClick={handleIncrease}>
        <span className="material-icons-round">add</span>
      </button>
    </StyledIntakeCounter>
  )
}

export default IntakeCounter
