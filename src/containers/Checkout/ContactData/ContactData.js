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
            name: null,
            email: null,
            street: null,
            postalCode: null,
            country: null,
            deliveryMethod: null
        },
        isLoading: true
    }

    componentDidMount() {
        const loadedOrderForm = {
            name: createInputElementConfig('text', 'Your Name'),
            email: createInputElementConfig('email', 'Your E-Mail'),
            street: createInputElementConfig('text', 'Street'),
            postalCode: createInputElementConfig('text', 'ZIP Code'),
            country: createInputElementConfig('text', 'Country'),
            deliveryMethod: createSelectElementConfig(
                {
                    'fastest': 'Fastest',
                    'cheapest': 'Cheapest'
                }
            )
        }
        this.setState({
            orderForm: loadedOrderForm,
            isLoading: false
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            isLoading: true
        });

        const orderData = {};
        Object.entries(this.state.orderForm).forEach(([inputName, inputValues]) => {
            orderData[inputName] = inputValues.elementValue;
        })

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: orderData
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

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
        updatedOrderForm[inputIdentifier].elementValue = event.target.value;
        this.setState({
            orderForm: updatedOrderForm
        });
    }
    render() {
        let form = null;

        if (this.state.isLoading) {
            form = <Spinner />
        } else {
            let inputElements = [];
            Object.entries(this.state.orderForm).forEach(([key, value]) => {
                inputElements.push(
                    <Input
                        key={key}
                        elementType={value.elementType}
                        elementConfig={value.elementConfig}
                        elementValue={value.elementValue}
                        changed={(event) => this.inputChangeHandler(event, key)} />
                )
            })

            form = (
                <form action="post" onSubmit={this.orderHandler}>
                    <h2>Enter your Contact Data</h2>
                    {inputElements}
                    <Button btnType='Success'>ORDER</Button>
                </form>
            );
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

function createSelectElementConfig(options) {
    const selectOptions = [];
    Object.entries(options).forEach(([value, displayValue]) => {
        selectOptions.push(
            { value: value, displayValue: displayValue }
        )
    });
    return {
        elementType: 'select',
        elementConfig: {
            options: selectOptions
        },
        elementValue: selectOptions[0].value
    }
}

export default withRouter(ContactData);