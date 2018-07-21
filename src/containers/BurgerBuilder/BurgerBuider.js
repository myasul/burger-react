import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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
        isOrdered: false,
        isLoading: false
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
                totalPrice: Number(Math.round(newPrice + 'e2') + 'e-2'),
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
                    totalPrice: Number(Math.round(newPrice + 'e2') + 'e-2'),
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

    purchaseContinuedHandler = () => {
        this.setState({
            isLoading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Matthew Yasul',
                address: {
                    street: 'Teststreet st',
                    postalCode: '12345',
                    country: 'Philippines'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
    render() {
        const disabledInfo = { ...this.state.ingredients };

        Object.entries(disabledInfo).forEach(
            ([key, value]) => {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        );

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            closeModal={this.updateOrderHandler}
            continued={this.purchaseContinuedHandler}
            totalPrice={this.state.totalPrice} />;

        if (this.state.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal displayModal={this.state.isOrdered} closeModal={this.updateOrderHandler}>
                    {orderSummary}
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