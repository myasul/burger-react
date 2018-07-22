import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: createInputElementConfig('text', 'Your Name'),
            email: createInputElementConfig('text', 'Your E-Mail'),
            street: createInputElementConfig('text', 'Street'),
            postalCode: createInputElementConfig('text', 'ZIP Code'),
            country: createInputElementConfig('text', 'Country')
            //deliveryMethod: 'fastest'
        },
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
        // console.log(this.state.orderForm)
        let inputElements = [];
        Object.entries(this.state.orderForm).forEach(([key, value]) => {
            inputElements.push(
                <Input
                    key={key}
                    elementType={value.elementConfig}
                    elementConfig={value.elementConfig}
                    elementValue={value.elementValue} />
            )
        })

        let form = (
            <form action="post">
                <h2>Enter your Contact Data</h2>
                {inputElements}
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

function createInputElementConfig(type, placeholder) {
    return {
        elementType: 'input',
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        elementValue: ''
    }
}

export default withRouter(ContactData);