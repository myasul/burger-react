import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        isPurchasable: false, // change to false
        isOrdered: false,
        isLoading: false,
        hasError: false
    }

    // componentDidMount() {
    //     axios.get('https://react-burger-project-b2062.firebaseio.com/ingredients.json')
    //         .then(response => {

    //             this.setState({
    //                 ingredients: response.data,
    //                 isPurchasable: this.checkIfPurchasable(response.data)
    //             })
    //         })
    //         .catch(error => {
    //             this.setState({
    //                 hasError: true
    //             })
    //         });
    // }

    checkIfPurchasable = () => {
        const ingredientCount = Object.values(this.props.ingredients).reduce(
            (totalCount, currentValue) => totalCount + currentValue
        );

        return ingredientCount > 0;
    }

    updateOrderHandler = () => {
        this.setState((prevState, props) => {
            return { isOrdered: !prevState.isOrdered }
        });
    }

    purchaseContinuedHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    }
    render() {
        console.log(this.props.ingredients);
        const burgerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        };
        let orderSummary = null;
        let burger = <Spinner />;
        const disabledInfo = { ...this.props.ingredients };

        Object.entries(disabledInfo).forEach(
            ([key, value]) => {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        );
        if (this.state.hasError) {
            burger = <p style={burgerStyle}>Ingredients cannot be loaded.</p>
        }

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                closeModal={this.updateOrderHandler}
                continued={this.purchaseContinuedHandler}
                totalPrice={this.props.totalPrice} />;
            burger =
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ordered={this.updateOrderHandler}
                        totalPrice={this.props.totalPrice}
                        more={this.props.onAddIngredient}
                        less={this.props.onRemoveIngredient}
                        isPurchasable={this.checkIfPurchasable()}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) => dispatch(burgerBuilderActions.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(burgerBuilderActions.removeIngredient(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));