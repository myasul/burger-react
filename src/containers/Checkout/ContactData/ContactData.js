import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';


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
        isFormValid: true
    }

    componentWillMount() {
        const loadedOrderForm = {
            name: createInputElementConfig('text', 'Your Name',
                {
                    required: true
                }),
            email: createInputElementConfig('email', 'Your E-Mail',
                {
                    required: true
                }),
            street: createInputElementConfig('text', 'Street',
                {
                    required: true
                }),
            postalCode: createInputElementConfig('text', 'ZIP Code',
                {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                }),
            country: createInputElementConfig('text', 'Country',
                {
                    required: true
                }),
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

    validationHandler = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = rules.minLength <= value.length && isValid;
        }

        if (rules.maxLength) {
            isValid = rules.maxLength >= value.length && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const orderData = {};
        Object.entries(this.state.orderForm).forEach(([inputName, inputValues]) => {
            orderData[inputName] = inputValues.elementValue;
        })

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            orderData: orderData
        };

        this.props.onSubmitOrder(order); \

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));

        updatedOrderForm[inputIdentifier].elementValue = event.target.value;
        updatedOrderForm[inputIdentifier].isValid = this.validationHandler(
            event.target.value, updatedOrderForm[inputIdentifier].validation);

        let isFormValid = true;
        Object.entries(updatedOrderForm).forEach(([key, inputForms]) => {
            Object.entries(inputForms).forEach(([name, value]) => {
                if (name === 'isValid') {
                    isFormValid = value && isFormValid;
                }
            })
        });

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }
    render() {
        let form = null;

        if (this.props.loading) {
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
                        changed={(event) => this.inputChangeHandler(event, key)}
                        invalid={!value.isValid} />
                )
            })

            form = (
                <form action="post" onSubmit={this.orderHandler}>
                    <h2>Enter your Contact Data</h2>
                    {inputElements}
                    <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
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

function createInputElementConfig(type, placeholder, validationRules) {
    return {
        elementType: 'input',
        elementConfig: {
            type: type,
            placeholder: placeholder
        },
        elementValue: '',
        validation: validationRules,
        isValid: true,
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
        elementValue: selectOptions[0].value,
        validation: {},
        isValid: true
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.ingredients,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitOrder: (orderData) => dispatch(orderActions.purchaseBurgerInit(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));