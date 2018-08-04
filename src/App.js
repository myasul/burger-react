import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import classes from './App.css';

class App extends Component {

    componentDidMount() {
        this.props.onCheckLoginValidity();
    }
    render() {
        let routes = null;
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path='/auth' component={Auth} />
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
