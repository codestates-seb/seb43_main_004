import React from 'react'
import { recipeTypes } from '../../pages/RecipeArchive'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import etc from '../../assets/etc.png'

const StyledRecipeItem = styled.li`
  width: calc((100% - 15rem) / 4);
  text-align: center;
  cursor: pointer;

  .recipe-img {
    width: 100%;
    height: 25rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    background: url(${etc}) no-repeat 50% 50%
      ${({ theme }) => theme.color.primary};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 500;
    margin-top: 2rem;
  }
`

interface propsss {
  data: recipeTypes
}
const RecipeItem = (props: propsss) => {
  const { data } = props
  const navigate = useNavigate()

  return (
    <StyledRecipeItem onClick={() => navigate(`/recipe/${data.recipeId}`)}>
      <div className="recipe-img">
        {data.img && <img src={data.img} alt={data.rcpName} />}
      </div>
      <p className="name">{data.rcpName}</p>
    </StyledRecipeItem>
  )
}

export default RecipeItem
