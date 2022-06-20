import React, { useState } from "react";
import { GlobalStateContext } from "./GlobalStateContext";



export const GlobalState = (props) => {
  const [pokedex, setPokedex] = useState([])

  const states = {pokedex}
  const setters = {setPokedex}

  return(
    <GlobalStateContext.Provider 
      value={{ states,
        setters, 
        // requests
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  )
}