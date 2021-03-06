import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

    state = {
        isPurchasable: false, // change to false
        isOrdered: false
    }

    componentDidMount() {
        this.props.onSetIngredients();
    }

    checkIfPurchasable = () => {
        const ingredientCount = Object.values(this.props.ingredients).reduce(
            (totalCount, currentValue) => totalCount + currentValue
        );

        return ingredientCount > 0;
    }

    updateOrderHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState((prevState, props) => {
                return { isOrdered: !prevState.isOrdered }
            });
        } else {
            this.props.onSetAuthRedirectPath('checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseContinuedHandler = () => {
        this.props.onCheckoutInit();
        this.props.history.push({
            pathname: '/checkout'
        });
    }
    render() {
        const burgerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        };
        let orderSummary = <Spinner />;
        let burger = <Spinner />;
        const disabledInfo = { ...this.props.ingredients };

        Object.entries(disabledInfo).forEach(
            ([key, value]) => {
                disabledInfo[key] = disabledInfo[key] <= 0;
            }
        );
        if (this.props.error) {
            burger = <p style={burgerStyle}>Ingredients cannot be loaded.</p>
            orderSummary = null;
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
                        isAuthenticated={this.props.isAuthenticated}
                        isPurchasable={this.checkIfPurchasable()}
                        disabledInfo={disabledInfo} />
                </Fragment>;
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.tokenId !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (type) => dispatch(actions.addIngredient(type)),
        onRemoveIngredient: (type) => dispatch(actions.removeIngredient(type)),
        onSetIngredients: () => dispatch(actions.fetchIngredients()),
        onCheckoutInit: () => dispatch(actions.checkoutInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));