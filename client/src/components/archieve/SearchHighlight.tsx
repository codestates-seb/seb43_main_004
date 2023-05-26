import React from 'react'
import { nutrient } from '../../pages/FoodArchivePage'

interface SearchHighlightProps {
  nutrient: nutrient
  isHighlighted: boolean
  handleClickFood: (nutrient: nutrient) => void // <-- 타입 수정
  value: string
}

const SearchHighlight: React.FC<SearchHighlightProps> = ({
  nutrient,
  isHighlighted,
  handleClickFood,
  value,
}) => {
  const foodName = nutrient.foodName
  const inputVal = value // Replace with the actual input value.
  const inputKeywords = inputVal
    .split(/\s+/)
    .filter((keyword) => keyword.trim() !== '')
  const highlightedFoodName = inputKeywords.reduce((acc, keyword) => {
    const regex = new RegExp(
      keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
      'gi'
    )
    return acc.replace(
      regex,
      (match) =>
        `<span class=${isHighlighted ? 'highlight' : ''}>${match}</span>`
    )
  }, foodName)

  return (
    <li
      className={`archive__list`}
      key={nutrient.foodId}
      onClick={() => handleClickFood(nutrient)}
    >
      <p dangerouslySetInnerHTML={{ __html: highlightedFoodName }}></p>
      <p>{nutrient.kcal} kcal</p>
    </li>
  )
}

export default SearchHighlight
