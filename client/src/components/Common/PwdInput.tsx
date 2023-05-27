import React, { useState } from 'react'

import styled from 'styled-components'
// 폴더 인식이 안되서 잠깐 주석추가

interface inputProps {
  label?: string
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
}

const PwdInput = (props: inputProps) => {
  const {
    label,
    placeholder,
    name,
    value,
    defaultValue,
    error,
    success,
    onChange,
    onBlur,
  } = props

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <InputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput
        id={label}
        type={isShow ? 'text' : 'password'}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        value={value}
        defaultValue={defaultValue}
        autoComplete="off"
      />
      <span onClick={() => setIsShow(!isShow)}>
        {isShow ? (
          <span className="material-symbols-outlined">visibility</span>
        ) : (
          <span className="material-symbols-outlined">visibility_off</span>
        )}
      </span>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  position: relative;
  height: 6rem;
  flex: 1;

  span.material-symbols-outlined {
    font-size: 1.8rem;
    position: absolute;
    top: 3.1rem;
    right: 1rem;
    color: var(--color-dark-gray);
  }
`

const StyledLabel = styled.label`
  display: inline-block;
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`
const StyledInput = styled.input`
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
`

const ErrorMessage = styled.p`
  margin: 0.4rem 0 0 0.4rem;
  color: var(--color-danger);
  font-size: 1.2rem;
`

const SuccessMessage = styled(ErrorMessage)`
  color: var(--color-point);
`

export default PwdInput
