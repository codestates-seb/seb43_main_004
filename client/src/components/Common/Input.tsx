import React, { KeyboardEvent } from 'react'

import styled, { css } from 'styled-components'
// 폴더 인식이 안되서 잠깐 주석추가

interface inputProps {
  label?: string
  type: string
  placeholder?: string
  name: string
  value?: string | number
  defaultValue?: string
  success?: string
  error?: string
  disabled?: boolean
  min?: number | string
  max?: number | string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void
  onKeyDown?(e: KeyboardEvent<HTMLInputElement>): void
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
    success,
    disabled,
    min,
    max,
    onChange,
    onBlur,
    onKeyDown,
  } = props

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
      <StyledInput
        id={label}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        name={name}
        value={value}
        min={min}
        max={max}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
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

const SuccessMessage = styled(ErrorMessage)`
  color: var(--color-point);
`

export default Input
