import axios from "axios";
import {GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING} from './types';

axios.defaults.baseURL = "http://localhost:8000"


export const getRecipes = (userId) => dispatch => {
    dispatch(setRecipesLoading());
    const config = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            
        },
    }
    const id = JSON.stringify({userId});
    axios
        .post('/recipe/recipes', id, config).then(res => {
            dispatch({
                    type:   GET_RECIPES,
                    payload: res.data

            })
        })
   
}

export const deleteRecipe = (id) => dispatch => {
  axios.delete(`/recipe/delete/${id}`).then(res => dispatch({

    type: DELETE_RECIPE,
    payload: id

  }) )
}

export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING,
      
    }
}