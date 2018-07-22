import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    componentDidMount() {
        let ingredients = {}
        const queryParams = new URLSearchParams(this.props.location.search);
        for (let param of queryParams) {
            ingredients[param[0]] = param[1];
        }
        this.setState({
            ingredients: ingredients
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data'
        });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={`${this.props.match.url}/contact-data`} component={ContactData} />
            </div>
        );
    }
}

export default Checkout;