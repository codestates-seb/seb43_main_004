import React from 'react'
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

const IntakeCounter = () => {
  return (
    <StyledIntakeCounter>
      <button type="button" className="decrease">
        <span className="material-icons-round">remove</span>
      </button>
      <input type="text" />
      <button type="button" className="increase">
        <span className="material-icons-round">add</span>
      </button>
    </StyledIntakeCounter>
  )
}

export default IntakeCounter
