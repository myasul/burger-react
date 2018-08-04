import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';

class Auth extends Component {

    state = {
        loginForm: {
            email: null,
            password: null,
        },
        isFormValid: true,
        isSignup: true
    }

    componentWillMount() {

        const loadedOrderForm = {
            email: createInputElementConfig('email', 'Your E-Mail',
                {
                    required: true,
                    validateEmail: true
                }),
            password: createInputElementConfig('password', 'Your Password',
                {
                    required: true,
                    minLength: 6
                }),
        };

        this.setState({
            loginForm: loadedOrderForm,
            isLoading: false
        });
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = JSON.parse(JSON.stringify(this.state.loginForm));

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
            loginForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }

    submitCredentialsHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.loginForm.email.elementValue,
            this.state.loginForm.password.elementValue,
            this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
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

        if (rules.validateEmail) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(value) && isValid;
        }

        return isValid;
    }

    render() {
        let inputElements = [];
        Object.entries(this.state.loginForm).forEach(([key, value]) => {
            inputElements.push(
                <Input
                    key={key}
                    elementType={value.elementType}
                    elementConfig={value.elementConfig}
                    elementValue={value.elementValue}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    invalid={!value.isValid} />
            )
        });

        let errorMessage = null;
        if (this.props.error) {
            const re = /_/gi;
            const error = this.props.error.replace(re, ' ');
            errorMessage = <p className={classes.ErrorMessage}>{error}</p>;
        }

        let redirectToBurgerBuilder = this.props.isAuthenticated ? <Redirect to="/" /> : null;

        let loginForm = (
            <Fragment>
                {redirectToBurgerBuilder}
                {errorMessage}
                <form onSubmit={this.submitCredentialsHandler}>
                    {inputElements}
                    <Button btnType='Success'>SUBMIT</Button>
                </form >
                <Button
                    btnType='Danger'
                    action={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGN IN ' : 'SIGN UP'}</Button>
            </Fragment>
        );

        if (this.props.loading) {
            loginForm = <Spinner />
        }

        return (
            <div className={classes.Auth}>
                {loginForm}
            </div>

        );
    }
}

const createInputElementConfig = (type, placeholder, validationRules) => {
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


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.tokenId !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.authInit(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);