import React from 'react'
import styled from 'styled-components'
import { radioProps } from '../../utils/options'

const Icons = (props: radioProps) => {
  const { radioArray, checkedValue, onChange } = props

  return (
    <div>
      <Legend>프로필 아이콘</Legend>
      <Container>
        {radioArray.map((i) => (
          <Radio key={i.id}>
            <input
              id={i.id}
              type="radio"
              name={i.name}
              value={i.value}
              checked={i.value === checkedValue}
              onChange={onChange}
            />
            <span className="material-symbols-outlined">check</span>
            <label htmlFor={i.id}>
              <img src={i.iconSrc} alt={i.value} />
            </label>
          </Radio>
        ))}
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem;
`

const Legend = styled.legend`
  margin: 0 0 0.4rem 0.4rem;
  font-size: 1.4rem;
  font-weight: 700;
`

const Radio = styled.div`
  position: relative;
  width: 11rem;

  label {
    display: block;
    border-radius: 100%;
    cursor: pointer;
  }

  img {
    width: 100%;
    padding: 1rem;
  }

  span {
    border-radius: 100%;
    background-color: var(--color-point-hover);
    color: var(--color-white);
    position: absolute;
    top: 7.6rem;
    left: 7rem;
    opacity: 0;
  }

  input {
    display: none;

    &:checked + span {
      opacity: 1;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 9rem;

    span {
      font-size: 1.8rem;
      position: absolute;
      top: 6rem;
      left: 6rem;
      opacity: 0;
    }
  }
`

export default Icons
