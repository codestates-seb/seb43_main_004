import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Input from '../components/Common/Input'
import Button from '../components/Common/Button'
import RecipeItem from '../components/archieve/RecipeItem'
import PaginationComponent from '../components/Common/Pagination'
import axios from 'axios'
import boil from '../assets/boil.png'
import etc from '../assets/etc.png'
import fry from '../assets/fry.png'
import grill from '../assets/grill.png'
import steam from '../assets/steam.png'
import stirFry from '../assets/stir-fry.png'
import all from '../assets/all.png'
import { useNavigate } from 'react-router-dom'

const StyledRecipeArchive = styled.main`
  width: 98%;
  max-width: 1250px;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.smmh};
    margin-bottom: 5rem;
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.larger};
    margin-bottom: 3rem;
  }

  .category {
    margin-bottom: 5rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};

    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;

      li {
        cursor: pointer;

        p {
          font-size: ${({ theme }) => theme.fontSize.large};
          font-weight: 600;
          margin-top: 2rem;
        }
      }
    }
  }

  .recipe-container {
    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 3rem;

      & > div {
        height: auto;
      }

      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
      }
    }

    .recipe-list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 5rem;
      gap: 5rem;

      .error-msg {
        text-align: center;
        width: 100%;
        color: ${({ theme }) => theme.color.darkGray};
        font-size: ${({ theme }) => theme.fontSize.smmh};

        span {
          font-size: 10rem;
          margin-bottom: 3rem;
        }
      }
    }
  }
`

export interface recipeTypes {
  recipeId: number
  rcpName: string
  rcpWay: string
  img?: string
}

interface recipeData {
  data: recipeTypes[]
  pageInfo: {
    page: number
    size: number
    totalElements: number
    totalPages: number
  }
}

const RecipeArchive = () => {
  const url = process.env.REACT_APP_SERVER_URL
  const types = [
    {
      img: all,
      type: '전체',
    },
    {
      img: grill,
      type: '굽기',
    },
    {
      img: steam,
      type: '찌기',
    },
    {
      img: fry,
      type: '튀기기',
    },
    {
      img: boil,
      type: '끓이기',
    },
    {
      img: stirFry,
      type: '볶기',
    },
    {
      img: etc,
      type: '기타',
    },
  ]

  const [searchTxt, setSearchTxt] = useState('')
  const [recipes, setRecipes] = useState<recipeData>({
    data: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  })
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = (activePage: number) => {
    setActivePage(activePage)
  }

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTxt) {
      getSearchData()
    }
  }

  const getData = async (keyword = '') => {
    // 필터링시 1페이지부터 보게
    if (keyword !== '') setActivePage(1)
    if (keyword === '전체') {
      keyword = ''
    }
    setSearchTxt('')

    try {
      const res = await axios.get(
        `${url}/recipes?page=${activePage}&size=12&filter=${keyword}`,
        {
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      setRecipes(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getSearchData = async () => {
    try {
      const res = await axios.get(
        `${url}/recipes/search?page=${activePage}&size=12&search=${searchTxt}`,
        {
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      setRecipes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (searchTxt) {
      getSearchData()
    } else {
      getData()
    }
  }, [activePage])

  return (
    <StyledRecipeArchive>
      <h2>레시피 아카이브</h2>
      <div className="category">
        <h3>레시피 분류</h3>
        <ul>
          {types.map((type, idx) => {
            return (
              <li key={idx} onClick={() => getData(type.type)}>
                <div>
                  <img src={type.img} alt={type.type} />
                  <p>{type.type}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="recipe-container">
        <h3>전체 레시피</h3>
        <div className="search">
          <Input
            type="text"
            name="search"
            value={searchTxt}
            placeholder="레시피의 이름을 입력해주세요."
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyDown={(e) => handleSearchEnter(e)}
          />
          <Button type="button" onClick={getSearchData}>
            <span className="material-icons-round">search</span>
            검색
          </Button>
        </div>
        <ul className="recipe-list">
          {recipes.data.length === 0 ? (
            <li className="error-msg">
              <span className="material-icons-round">search_off</span>
              <h4>검색 결과가 없습니다.</h4>
            </li>
          ) : (
            recipes.data.map((recipe) => {
              return <RecipeItem data={recipe} key={recipe.recipeId} />
            })
          )}
        </ul>
        <PaginationComponent
          activePage={activePage}
          totalItemsCount={recipes.pageInfo.totalElements}
          onPageChange={handlePageChange}
        />
      </div>
    </StyledRecipeArchive>
  )
}

export default RecipeArchive
