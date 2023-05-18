import React from 'react'
import styled, { css } from 'styled-components'
// 폴더 인식이 안되서 잠깐 주석추가

interface inputProps {
  label?: string
  type: string
  placeholder?: string
  name: string
  value?: string
  defaultValue?: string
  error?: string
  disabled?: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void
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
    disabled,
    onChange,
    onBlur,
  } = props

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        value={value}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  height: 6rem;
  flex: 1;
`

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`
const StyledInput = styled.input<inputProps>`
  width: 100%;
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-dark-gray);

  &::placeholder {
    color: var(--color-light-gray);
  }
  &:focus {
    border: 1px solid var(--color-secondary);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid var(--color-light-gray);
      color: var(--color-light-gray);
    `}
`

const ErrorMessage = styled.p`
  margin: 0.4rem 0 0 0.4rem;
  color: var(--color-danger);
  font-size: 1.2rem;
`

export default Input
