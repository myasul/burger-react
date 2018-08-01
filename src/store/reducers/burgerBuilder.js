import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        meat: 0,
        cheese: 0,
        salad: 0,
        bacon: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.9,
    cheese: 0.5,
    meat: 1.5
};

const reducer = (state = initialState, action) => {
    let updatedIngredients = null;
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
            }
        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            }
        default:
            return state;
    }
}

export default reducer;