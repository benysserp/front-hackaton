import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NutriA from '../assets/640px-Nutri-score-A.svg.png'
import NutriB from '../assets/640px-Nutri-score-B.svg.png'
import NutriC from '../assets/640px-Nutri-score-C.svg.png'
import NutriD from '../assets/640px-Nutri-score-D.svg.png'
import NutriE from '../assets/640px-Nutri-score-E.svg.png'
import Nutri from '../assets/640px-Nutri-score.png'

import { errorTranslator } from '../services/basicServices'

export default function Article(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const { productArray, productsCompare } = useSelector((state) => ({
    ...state.productReducer,
  }));
  const {alertMsg} = useSelector(state => ({
    ...state.formReducer
  }))
  
  let img = ""

  if(props.nutri === "a") img = NutriA
  else if(props.nutri === "b") img = NutriB
  else if(props.nutri === "c") img = NutriC
  else if(props.nutri === "d") img = NutriD
  else if(props.nutri === "e") img = NutriE
  else img = Nutri

  const handleCompareProducts = () => {
    const getCompareCart = JSON.parse(localStorage.getItem('compareCart'))
    if(getCompareCart === null) {
      const newArray = []
      newArray.push(props)
      localStorage.setItem('compareCart', JSON.stringify(newArray))
      dispatch({
        type: "PRODUCTSCOMPARE",
        payload: newArray
      })
    }
    else if(getCompareCart.length === 2) {
      const msgError = errorTranslator("errCompare")
      dispatch({
        type: "ALERTMSG",
        payload: msgError
      })
      setTimeout(() => {
        dispatch({
          type: "ALERTMSG",
          payload: {
            ...msgError,
            msg: ""
          }
        })
      }, 2000)
    }
    else {
      const newArray = [...getCompareCart]
      const findProduct = newArray.findIndex(p => p.code === props.code)
      if(findProduct === -1) {
        newArray.push(props)
        localStorage.setItem('compareCart', JSON.stringify(newArray))
        dispatch({
          type: "PRODUCTSCOMPARE",
          payload: newArray
        })
      }
    }
  }

  return (
    <article className="mt-4 mr-2 transition-all duration-200 w-full md:w-80 md:h-80 md:min-h-full bg-white rounded-lg flex flex-col items-center hover:shadow-lg">
        <div className="w-full flex">
          <div className="p-2 w-1/4 flex justify-center">
            <img src={props.image} alt={`${props.name}`} className="h-32 object-cover ml-auto mr-auto"/>
          </div>
          <h2 className="w-3/4 p-2 font-medium text-blue-500">{props.name}</h2>
        </div>
        <img src={img} alt="Nutriscore" className="p-2 w-24 ml-0 mr-auto"/>
        <p className="text-xs w-full p-1">Disponible chez : <span className="font-medium">{props.stores}</span></p>
        <div className="flex flex-col w-full mb-0 mt-auto">
        <button
        onClick={(e) => e.preventDefault(handleCompareProducts())}
        className="transition-all w-full p-1 bg-blue-800 hover:bg-blue-900 font-medium text-white">
          Comparer
        </button>
        <button 
        onClick={(e) => e.preventDefault(navigate(`/product/${props.code}`))}
        className="transition-all w-full rounded-b-lg p-1 bg-blue-400 hover:bg-blue-500 font-medium text-white">Fiche détails</button>
        </div>
    </article>
  )
}
