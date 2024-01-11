import React from 'react'
import styled from 'styled-components'
import { radioProps } from '../../utils/options'

const Radio = (props: radioProps) => {
  const { legend, radioArray, checkedValue, onChange } = props

  return (
    <div>
      <Legend>{legend}</Legend>
      <RadioWrapper>
        {radioArray.map((i) => (
          <RadioInputWrapper key={i.id}>
            <input
              id={i.id}
              type="radio"
              name={i.name}
              value={i.value}
              checked={i.value === checkedValue}
              onChange={onChange}
            />
            <StyledLabel htmlFor={i.id}>{i.label}</StyledLabel>
          </RadioInputWrapper>
        ))}
      </RadioWrapper>
    </div>
  )
}

const RadioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  row-gap: 2rem;

  input[type='radio'] {
    display: none;
  }

  input[type='radio']:checked + label {
    color: var(--color-white);
    background-color: var(--color-primary);
    font-weight: 600;
    transition: all 0.1s;
  }
`

const RadioInputWrapper = styled.div`
  margin-top: 1rem;
`

const Legend = styled.legend`
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`

const StyledLabel = styled.label`
  font-size: 1.4rem;
  color: var(--color-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
`

export default Radio
