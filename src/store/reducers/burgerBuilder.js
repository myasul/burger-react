import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.9,
    cheese: 0.5,
    meat: 1.5
};

const addIngredient = (state, action) => {
    const updatedIngredient = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] + 1 });
    const updatedState = {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIngredient = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] - 1 });
    const updatedState = {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    const updatedState = {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    };
    return updateObject(state, updatedState);
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action)
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action)
        case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action)
        case (actionTypes.FETCH_INGREDIENTS_FAILED): return fetchIngredientsFailed(state, action)
        default:
            return state;
    }
}

export default reducer;