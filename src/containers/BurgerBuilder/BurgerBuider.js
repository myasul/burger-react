import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.9,
    cheese: 0.5,
    meat: 1.5
};
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const newIgredients = { ...this.state.ingredients };
        let newPrice = INGREDIENT_PRICES[type];

        this.setState((prevState, props) => {
            newIgredients[type] = prevState.ingredients[type] + 1;
            newPrice += prevState.totalPrice;

            return {
                ingredients: newIgredients,
                totalPrice: newPrice
            }
        });
    }

    removeIngredientHandler = (type) => {
        const newIgredients = { ...this.state.ingredients };
        let newPrice = INGREDIENT_PRICES[type];

        this.setState((prevState, props) => {
            if (prevState.ingredients[type] > 0) {
                newIgredients[type] = prevState.ingredients[type] - 1;
                newPrice -= prevState.totalPrice;

                return {
                    ingredients: newIgredients,
                    totalPrice: newPrice
                }
            }
            return;
        });
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };

        Object.entries(disabledInfo).forEach(
            ([key, value]) => {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        );

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    more={this.addIngredientHandler}
                    less={this.removeIngredientHandler}
                    disabledInfo={disabledInfo} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;