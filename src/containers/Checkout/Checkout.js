import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace({
            pathname: '/checkout/contact-data'
        });
    }

    render() {
        let checkoutSummary = <Redirect to="/" />
        let checkoutComplete = this.props.purchased ? <Redirect to="/" /> : null

        if (this.props.ingredients) {
            checkoutSummary = (
                < Fragment >
                    {checkoutComplete}
                    < CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={`${this.props.match.url}/contact-data`}
                        component={ContactData} />
                </Fragment >

            )
        }
        return (
            <div>
                {checkoutSummary}
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}


export default connect(mapStateToProps)(Checkout);