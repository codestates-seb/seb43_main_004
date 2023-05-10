import React from 'react'
import styled from 'styled-components'

interface inputProps {
  label?: string
  type: string
  placeholder: string
  name: string
  value?: string
  defaultValue?: string
  error?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input = (props: inputProps) => {
  const {
    label,
    type,
    placeholder,
    name,
    value,
    defaultValue,
    error,
    onChange,
  } = props

  return (
    <div>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`
const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-dark-gray);

  &::placeholder {
    color: var(--color-light-gray);
  }
  &:focus {
    border: 1px solid var(--color-secondary);
  }
`

const ErrorMessage = styled.p`
  margin: 0.4rem 0 0 0.4rem;
  color: var(--color-danger);
  font-size: 1.2rem;
`

export default Input
