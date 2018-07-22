import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true
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
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                })
            });

    }

    render() {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default Orders;