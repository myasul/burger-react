import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        street: '',
        postalCode: '',
        isLoading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
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
            .then(response => {
                this.setState({
                    isLoading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    isLoading: false
                });
            });

    }
    render() {
        let form = (
            <form action="post">
                <h2>Enter your Contact Data</h2>
                <Input inputtype='input' type='text' placeholder='Your Name' />
                <Input inputtype='input' type='text' placeholder='Your Email' />
                <Input inputtype='input' type='text' placeholder='Street' />
                <Input inputtype='input' type='text' placeholder='Postal Code' />
                <Button
                    btnType='Success'
                    action={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.isLoading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);