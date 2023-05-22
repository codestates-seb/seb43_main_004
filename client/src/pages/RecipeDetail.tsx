import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'

const StyledRecipeDetail = styled.main``

interface recipeDetailType {
  recipeId: number
  rcpName: string
  rcpWay: string
  rcpPat: string
  kcal: number
  carbohydrate: number
  protein: number
  fat: number
  natrium: number
  img?: string
  ingredients: string
  manual01?: string
  manualImg01?: string
  manual02?: string
  manualImg02?: string
  manual03?: string
  manualImg03?: string
  manual04?: string
  manualImg04?: string
  manual05?: string
  manualImg05?: string
  manual06?: string
  manualImg06?: string
  manual07?: string
  manualImg07?: string
  manual08?: string
  manualImg08?: string
  manual09?: string
  manualImg09?: string
  manual10?: string
  manualImg10?: string
  manual11?: string
  manualImg11?: string
  manual12?: string
  manualImg12?: string
  manual13?: string
  manualImg13?: string
  manual14?: string
  manualImg14?: string
  manual15?: string
  manualImg15?: string
  manual16?: string
  manualImg16?: string
  manual17?: string
  manualImg17?: string
  manual18?: string
  manualImg18?: string
  manual19?: string
  manualImg19?: string
  manual20?: string
  manualImg20?: string
  rcpNaTip: string
}

const RecipeDetail = () => {
  // const url = process.env.REACT_APP_SERVER_URL
  const url = `http://localhost:4000`
  const { id } = useParams()
  const [data, setData] = useState<recipeDetailType>({
    recipeId: 0,
    rcpName: '',
    rcpWay: '',
    rcpPat: '',
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
    natrium: 0,
    ingredients: '',
    rcpNaTip: '',
  })

  const getData = async () => {
    const res = await axios.get(`${url}/recipes`, {
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    })
    // const res = await axios.get(`${url}/recipes/${id}`, {
    //   headers: {
    //     'Content-Type': `application/json`,
    //     'ngrok-skip-browser-warning': '69420',
    //   },
    // })
    setData(res.data.data[4])
    console.log(res.data.data[4])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <StyledRecipeDetail>
      <div className="visual">
        <img src={data.img} alt={data.rcpName} />
      </div>
      <div className="title">
        <h2>{data.rcpName}</h2>
        <p className="tips">{data.rcpNaTip}</p>
      </div>
    </StyledRecipeDetail>
  )
}

export default RecipeDetail
