import React from 'react'
import styled, { css } from 'styled-components'

interface buttonProps {
  children: React.ReactNode
  width?: string
  disabled?: boolean
  onClick(): void
  outline?: boolean | string
}

const Button = (props: buttonProps) => {
  const { children, width, disabled, onClick, outline } = props

  return (
    <StyledButton
      width={width}
      disabled={disabled}
      onClick={onClick}
      outline={outline?.toString()}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<buttonProps>`
  padding: 1.2rem 1.6rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--color-point);
  color: var(--color-white);
  transition: 0.1s all;
  cursor: pointer;

  &:hover {
    background-color: var(--color-point-hover);
  }

  ${({ width }) =>
    width &&
    css`
      display: block;
      width: ${width};
    `}
  ${({ outline }) =>
    outline &&
    css`
      background-color: var(--color-white);
      border: 1px solid var(--color-point);
      color: var(--color-point);

      &:hover {
        background-color: var(--color-point-hover);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: var(--color-light-gray);
      cursor: not-allowed;

      &:hover {
        background-color: var(--color-light-gray);
      }
    `}
`

export default Button
