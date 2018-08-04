import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import classes from './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
})

class App extends Component {

    componentDidMount() {
        this.props.onCheckLoginValidity();
    }
    render() {
        let routes = null;
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' component={asyncAuth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path='/auth' component={asyncAuth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        }

        return (
            <div className={classes.App}>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.tokenId !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckLoginValidity: () => dispatch(actions.checkLoginValidity())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
