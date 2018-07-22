import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
        hasErrors: false
    }

    componentDidMount() {
        let orders = [];
        axios.get('/orders.json')
            .then(response => {
                Object.entries(response.data)
                    .forEach(([key, order]) => {
                        orders.push({
                            ...order,
                            key: key
                        })
                    });
                this.setState({
                    orders: orders,
                    isLoading: false
                });
                console.log(this.state.orders);
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    hasErrors: true
                })
            });

    }

    render() {
        const errorStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        };

        let orders = this.state.orders.map(order => {
            return <Order
                key={order.key}
                ingredients={order.ingredients}
                price={order.totalPrice} />
        });

        if (this.state.isLoading) {
            orders = <Spinner />
        }

        if (this.state.hasErrors) {
            orders = <p style={errorStyle}>Orders cannot be loaded.</p>
        }

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);