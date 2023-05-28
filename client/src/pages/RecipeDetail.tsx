import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import etc from '../assets/etc.png'
import Button from '../components/Common/Button'

const StyledRecipeDetail = styled.main`
  width: 100%;
  max-width: 1250px;

  .title-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;

    .visual {
      width: 50%;
      overflow: hidden;
      border-radius: 1.5rem;
      background: url(${etc}) no-repeat 50% 50%
        ${({ theme }) => theme.color.primary};
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      width: 45%;

      h2 {
        font-size: ${({ theme }) => theme.fontSize.lgh};
        margin-bottom: 2rem;
        line-height: 1.3em;
        word-break: keep-all;
      }

      .tips {
        font-size: ${({ theme }) => theme.fontSize.larger};
        line-height: 1.5em;
        word-break: keep-all;
        margin-bottom: 3rem;
      }

      h3 {
        font-size: ${({ theme }) => theme.fontSize.smmh};
        padding: 2rem;
        border-radius: 1.5rem;
        margin-bottom: 1rem;
      }

      .ingredients {
        margin-bottom: 3rem;

        h3 {
          background-color: ${({ theme }) => theme.color.primary};
        }

        div {
          border: 1px solid ${({ theme }) => theme.color.lightGray};
          border-radius: 1.5rem;
          padding: 2rem;
          line-height: 1.5em;
          word-break: keep-all;
        }
      }

      .nutrient {
        h3 {
          border: 3px solid ${({ theme }) => theme.color.primary};
        }

        ul {
          border: 1px solid ${({ theme }) => theme.color.lightGray};
          border-radius: 1.5rem;
          padding: 2rem;

          li {
            margin-bottom: 1rem;

            span {
              font-weight: 600;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .recipe-step {
    h3 {
      font-size: ${({ theme }) => theme.fontSize.smmh};
      border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
      margin-bottom: 3rem;

      span {
        display: inline-block;
        padding: 1.5rem 2rem;
        background-color: ${({ theme }) => theme.color.primary};
        border-radius: 1.5rem 1.5rem 0 0;
      }
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5rem;
        padding: 3rem;
        word-break: keep-all;

        &:last-child {
          margin-bottom: 0;
        }

        .txt-box {
          width: 60%;

          .step {
            font-size: ${({ theme }) => theme.fontSize.smh};
            margin-bottom: 2rem;
          }

          .desc {
            font-size: ${({ theme }) => theme.fontSize.large};
            line-height: 1.5em;
          }
        }

        .img-box {
          width: 35%;
          border-radius: 1.5rem;
          overflow: hidden;
          background: url(${etc}) no-repeat 50% 50%
            ${({ theme }) => theme.color.primary};
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  button {
    display: flex;
    margin: 5rem auto 0;
  }

  @media ${({ theme }) => theme.device.tablet} {
    .title-wrap {
      .info {
        h2 {
          font-size: ${({ theme }) => theme.fontSize.smmh};
        }

        .tips {
          font-size: ${({ theme }) => theme.fontSize.large};
          margin-bottom: 2rem;
        }

        h3 {
          font-size: ${({ theme }) => theme.fontSize.larger};
          padding: 1.5rem;
        }

        .ingredients {
          margin-bottom: 2rem;

          div {
            padding: 1.5rem;
          }
        }
      }
    }

    .recipe-step {
      h3 {
        font-size: ${({ theme }) => theme.fontSize.smh};
      }

      ul {
        li {
          margin-bottom: 3rem;
        }
      }
    }
  }

  @media ${({ theme }) => theme.device.mobile} {
    .title-wrap {
      flex-direction: column;

      .visual {
        width: 100%;
        height: 30rem;
        margin-bottom: 3rem;
      }

      .info {
        width: 100%;

        h2 {
          font-size: ${({ theme }) => theme.fontSize.smh};
        }

        .tips {
          font-size: ${({ theme }) => theme.fontSize.middle};
        }

        h3 {
          font-size: ${({ theme }) => theme.fontSize.large};
        }
      }
    }

    .recipe-step {
      h3 {
        font-size: ${({ theme }) => theme.fontSize.larger};
        margin-bottom: 0;
      }

      ul {
        li {
          flex-direction: column;
          padding: 2rem;
          margin-bottom: 2rem;

          .txt-box {
            width: 100%;
            margin-bottom: 2rem;

            .step {
              font-size: ${({ theme }) => theme.fontSize.large};
              margin-bottom: 1rem;
            }

            .desc {
              font-size: ${({ theme }) => theme.fontSize.middle};
            }
          }

          .img-box {
            width: 100%;
          }
        }
      }
    }
  }
`

interface recipeDetailType {
  [key: string]: string | undefined
}

const RecipeDetail = () => {
  const navigate = useNavigate()
  const url = process.env.REACT_APP_SERVER_URL
  const { id } = useParams()
  const [data, setData] = useState<recipeDetailType>({})

  const getData = async () => {
    try {
      const res = await axios.get(`${url}/recipes/${id}`, {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      setData(res.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.status === 401) {
          navigate(`/sign-in`)
        } else {
          // 그 외 에러(403,404,500)는 아래 페이지로 리다이렉트..
          navigate(`/error/${error.response?.data.status}`)
        }
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <StyledRecipeDetail>
      <div className="title-wrap">
        <div className="visual">
          <img src={data.img} alt={data.rcpName} />
        </div>
        <div className="info">
          <h2>{data.rcpName}</h2>
          <p className="tips">{data.rcpNaTip}</p>
          <div className="ingredients">
            <h3>필요한 재료</h3>
            <div>{data.ingredients}</div>
          </div>
          <div className="nutrient">
            <h3>영양성분</h3>
            <ul>
              <li>
                <span>칼로리</span> : {data.kcal}kcal
              </li>
              <li>
                <span>탄수화물</span> : {data.carbohydrate}g
              </li>
              <li>
                <span>단백질</span> : {data.protein}g
              </li>
              <li>
                <span>지방</span> : {data.fat}g
              </li>
              <li>
                <span>나트륨</span> : {data.salt}mg
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="recipe-step">
        <h3>
          <span>레시피</span>
        </h3>
        <ul>
          {Object.keys(data)
            .filter((el) => /^manual\d{2}$/.test(el))
            .map((item, idx) => {
              const num = idx < 10 ? `0${idx + 1}` : idx + 1
              const txt = `manual${num}`
              const visual = `manualImg${num}`

              if (data[txt] === '') return
              return (
                <li key={idx}>
                  <div className="txt-box">
                    <h4 className="step">Step {idx + 1}</h4>
                    <p className="desc">{data[txt]}</p>
                  </div>
                  <div className="img-box">
                    <img src={data[visual]} alt={data[txt]} />
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
      <Button type="button" onClick={() => navigate(`/recipe`)}>
        목록으로 돌아가기
      </Button>
    </StyledRecipeDetail>
  )
}

export default RecipeDetail
