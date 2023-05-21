import React, { useState } from 'react'
import { styled } from 'styled-components'
import Input from '../components/Common/Input'
import Button from '../components/Common/Button'
import RecipeItem from '../components/archieve/RecipeItem'
import PaginationComponent from '../components/Common/Pagination'

const StyledRecipeArchive = styled.div``

const RecipeArchive = () => {
  const [searchTxt, setSearchTxt] = useState('')
  const getSearchData = () => {
    console.log('검색 요청 보내기')
  }
  return (
    <StyledRecipeArchive>
      <h2>레시피 아카이브</h2>
      <div className="category">
        <h3>레시피 분류</h3>
        <ul>
          <li>찌기</li>
        </ul>
      </div>
      <div className="recipe-container">
        <h3>전체 레시피</h3>
        <div className="search">
          <Input
            type="text"
            name="search"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <Button type="button" onClick={getSearchData}>
            <span className="material-icons-round">search</span>
            검색
          </Button>
        </div>
        <ul className="recipe-list">
          <RecipeItem />
        </ul>
        {/* <PaginationComponent /> */}
      </div>
    </StyledRecipeArchive>
  )
}

export default RecipeArchive
