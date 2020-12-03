import {GET_RECIPES, DELETE_RECIPE, RECIPES_LOADING} from '../actions/types'

const initialState = {
    recipes :[],
    loading: false
}
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        case DELETE_RECIPE:
         
            return {
                ...state,
                recipes: state.recipes.filter(recipe => recipe._id != action.payload),
            }
            console.log(action.payload)
        case RECIPES_LOADING: 
            return {
                ...state,
                loading: true
            }
        default: return state;

    }
}