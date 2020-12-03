import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import recipeReducer from './recipeReducer'

export default combineReducers ({  
    error: errorReducer,
    auth: authReducer,
    recipe: recipeReducer
})
