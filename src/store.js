import {createStore} from 'redux'

const reducer = (state, action) => {
  if(action.type === 'ADD_CRONOMETRO'){
    return{
      ...state,
      cronometros: state.cronometros.concat(action.newCronometro),
      showNewCronometro: false,
      showButtonNewCronometro: true
    }
  }else if(action.type === 'SHOW_FORM_NEW_CRONOMETRO'){
    return{
      ...state,
      showNewCronometro: true,
      showButtonNewCronometro: false
    }
  }else if(action.type === 'REMOVE_CRONOMETRO'){
    return{
      ...state,
      cronometros: [
        ...state.cronometros.slice(0,action.index),
        ...state.cronometros.slice(action.index+1)
      ],
      showButtonNewCronometro:true,
    }
  }else if(action.type === 'RUN_TIME'){
    return{
      ...state,
      cronometros: [
        ...state.cronometros.slice(0, action.index),
        action.newCronometro,
        ...state.cronometros.slice(action.index+1)
      ]
    }
  }else if(action.type === "CLOSE_FORM_CRONOMETRO"){
    return{
      ...state,
      showNewCronometro: false,
      showButtonNewCronometro: true,
    }
  }
  return state
}

export default createStore(reducer, {cronometros:[], showNewCronometro:true, showButtonNewCronometro:false})