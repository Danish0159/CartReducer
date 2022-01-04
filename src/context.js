import React, { useState, useContext, useReducer, useEffect } from 'react'
// import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, disptch] = useReducer(reducer, initialState);

  const clearCart = () => {
    disptch({ type: 'CLEAR_CART' })
  }

  const removeItem = (id) => {
    disptch({ type: 'REMOVE_ITEM', payload: id });
  }

  const increase = (id) => {
    disptch({ type: 'INCREASE', payload: id });
  }

  const decrease = (id) => {
    disptch({ type: 'DECREASE', payload: id });
  }

  const fetchDate = async () => {
    disptch({ type: 'LOADING' });
    const responce = await fetch(url);
    const cart = await responce.json();
    disptch({ type: 'DISPLAY_ITEMS', payload: cart });
  }

  useEffect(() => {
    fetchDate();
  }, [])


  useEffect(() => {
    disptch({ type: 'GET_TOTALS' });
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
