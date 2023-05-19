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
          <div key={i.id} className="radio-div">
            <input
              id={i.id}
              type="radio"
              name={i.name}
              value={i.value}
              checked={i.value === checkedValue}
              onChange={onChange}
            />
            <StyledLabel htmlFor={i.id}>{i.label}</StyledLabel>
          </div>
        ))}
      </RadioWrapper>
    </div>
  )
}

const RadioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  input[type='radio'],
  input[type='radio']:checked + label {
    color: var(--color-point);
    accent-color: var(--color-point);
    font-weight: 600;
  }

  .radio-div {
    margin-top: 0.8rem;
  }
`

const Legend = styled.legend`
  display: inline-block;
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`

const StyledLabel = styled.label`
  font-size: 1.4rem;
`

export default Radio
