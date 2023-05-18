import React from 'react'
import styled, { css } from 'styled-components'
// 폴더 인식이 안되서 잠깐 주석추가
interface buttonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  width?: string
  disabled?: boolean
  onClick(): void
  outline?: boolean | string
}

const Button = (props: buttonProps) => {
  const {
    children,
    width,
    onClick,
    type = 'button',
    disabled = false,
    outline = false,
  } = props

  return (
    <StyledButton
      type={type}
      width={width}
      disabled={disabled}
      onClick={onClick}
      outline={outline.toString()}
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
    outline === 'true' &&
    css`
      background-color: var(--color-white);
      border: 1px solid var(--color-point);
      color: var(--color-point);

      &:hover {
        color: var(--color-white);
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
