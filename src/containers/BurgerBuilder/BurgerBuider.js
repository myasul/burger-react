import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        isPurchasable: false,
        isOrdered: false
    }

    checkIfPurchasable = (newIgredients) => {
        const ingredientCount = Object.values(newIgredients).reduce(
            (totalCount, currentValue) => totalCount + currentValue
        );

        return ingredientCount > 0;
    }


    addIngredientHandler = (type) => {
        const newIgredients = { ...this.state.ingredients };
        let newPrice = INGREDIENT_PRICES[type];

        this.setState((prevState, props) => {
            newIgredients[type] = prevState.ingredients[type] + 1;
            newPrice += prevState.totalPrice;
            const isPurchasable = this.checkIfPurchasable(newIgredients);

            return {
                ingredients: newIgredients,
                totalPrice: newPrice,
                isPurchasable: isPurchasable
            }
        });
    }

    removeIngredientHandler = (type) => {
        const newIgredients = { ...this.state.ingredients };
        let newPrice = INGREDIENT_PRICES[type];

        this.setState((prevState, props) => {
            if (prevState.ingredients[type] > 0) {
                newIgredients[type] = prevState.ingredients[type] - 1;
                newPrice = prevState.totalPrice - newPrice;
                const isPurchasable = this.checkIfPurchasable(newIgredients);

                return {
                    ingredients: newIgredients,
                    totalPrice: newPrice,
                    isPurchasable: isPurchasable
                }
            }
            return;
        });
    }

    updateOrderHandler = () => {
        this.setState((prevState, props) => {
            return { isOrdered: !prevState.isOrdered }
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
                <Modal displayModal={this.state.isOrdered} closeModal={this.updateOrderHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ordered={this.updateOrderHandler}
                    totalPrice={this.state.totalPrice}
                    more={this.addIngredientHandler}
                    less={this.removeIngredientHandler}
                    isPurchasable={this.state.isPurchasable}
                    disabledInfo={disabledInfo} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;