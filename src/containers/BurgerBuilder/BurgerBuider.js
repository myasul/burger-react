import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.9,
    cheese: 0.5,
    meat: 1.5
};
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        isPurchasable: false,
        isOrdered: false,
        isLoading: false,
        hasError: false
    }

    componentDidMount() {
        axios.get('https://react-burger-project-b2062.firebaseio.com/ingredients.json')
            .then(response => {

                this.setState({
                    ingredients: response.data,
                    isPurchasable: this.checkIfPurchasable(response.data)
                })
            })
            .catch(error => {
                this.setState({
                    hasError: true
                })
            });
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
        const ingredientSearchParam = [];
        Object.entries(this.state.ingredients).forEach(([key, value]) => {
            ingredientSearchParam.push(`${key}=${value}`);
        })
        ingredientSearchParam.push(`price=${this.state.totalPrice}`);

        this.props.history.push({
            pathname: '/checkout',
            search: `?${ingredientSearchParam.join('&')}`
        });
    }
    render() {
        const burgerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        };
        let orderSummary = null;
        let burger = <Spinner />;
        const disabledInfo = { ...this.state.ingredients };

        Object.entries(disabledInfo).forEach(
            ([key, value]) => {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        );
        if (this.state.hasError) {
            burger = <p style={burgerStyle}>Ingredients cannot be loaded.</p>
        }

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                closeModal={this.updateOrderHandler}
                continued={this.purchaseContinuedHandler}
                totalPrice={this.state.totalPrice} />;
            burger =
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ordered={this.updateOrderHandler}
                        totalPrice={this.state.totalPrice}
                        more={this.addIngredientHandler}
                        less={this.removeIngredientHandler}
                        isPurchasable={this.state.isPurchasable}
                        disabledInfo={disabledInfo} />
                </Fragment>;
        }


        if (this.state.isLoading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal displayModal={this.state.isOrdered} close={this.updateOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);