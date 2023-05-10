import React from 'react'
import styled from 'styled-components'

type radio = {
  id: string
  name: string
  value: string
}

interface radioProps {
  legend: string
  radioArray: radio[]
  checkedValue: string
  error?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Radio = (props: radioProps) => {
  const { legend, radioArray, checkedValue, error, onChange } = props

  return (
    <RadioGroup>
      <Legend>{legend}</Legend>
      <RadioWrapper>
        {radioArray.map((i) => (
          <div key={i.id}>
            <StyledLabel htmlFor={i.id}>{i.value}</StyledLabel>
            <input
              id={i.id}
              type="radio"
              name={i.name}
              value={i.value}
              checked={i.value === checkedValue}
              onChange={onChange}
            />
          </div>
        ))}
      </RadioWrapper>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </RadioGroup>
  )
}

const RadioGroup = styled.div``

const RadioWrapper = styled.div`
  display: flex;
  gap: 2rem;
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

const ErrorMessage = styled.p`
  margin: 0.4rem 0 0 0.4rem;
  color: var(--color-danger);
  font-size: 1.2rem;
`

export default Radio
