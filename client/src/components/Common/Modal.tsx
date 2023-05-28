import React from 'react'
import { styled } from 'styled-components'

const StyledModal = styled.div`
  display: none;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  &.on {
    display: flex;
  }

  .msg-box {
    width: 50%;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 5rem;

    span {
      font-size: ${({ theme }) => theme.fontSize.sml};
      margin-bottom: 3rem;
    }

    .msg-txt {
      font-size: ${({ theme }) => theme.fontSize.large};
      margin-bottom: 5rem;
      white-space: pre-line;
      text-align: center;
      line-height: 1.5em;
    }

    .btn-box {
      display: flex;
      gap: 0.5rem;
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .msg-box {
      width: 90%;
      padding: 3rem;

      span {
        margin-bottom: 2rem;
      }

      .msg-txt {
        font-size: ${({ theme }) => theme.fontSize.middle};
        margin-bottom: 3rem;
      }
    }
  }
`

interface ModalProps {
  state: boolean
  setState(state: boolean): void
  icon?: string
  msg: string
  children: React.ReactNode
}

const Modal = (props: ModalProps) => {
  const { state, setState, icon, msg, children } = props
  const handleState = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setState(false)
    }
  }

  return (
    <StyledModal className={state ? 'on' : ''} onClick={handleState}>
      <div className="msg-box">
        {icon && <span className="material-icons-round">{icon}</span>}
        {/* 줄바꿈이 필요할때는 \n 추가 */}
        <p className="msg-txt">{msg}</p>
        <div className="btn-box">{children}</div>
      </div>
    </StyledModal>
  )
}

export default Modal
