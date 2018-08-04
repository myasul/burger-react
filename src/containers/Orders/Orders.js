import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
        hasErrors: false
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.tokenId, this.props.userId);
    }

    render() {
        const errorStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        };


        let orders = <Spinner />

        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order
                    key={order.key}
                    ingredients={order.ingredients}
                    price={order.totalPrice} />
            });
        }

        if (this.props.error) {
            orders = <p style={errorStyle}>Orders cannot be loaded.</p>
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (tokenId, userId) => dispatch(actions.fetchOrdersInit(tokenId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));