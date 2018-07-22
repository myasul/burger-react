import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider';
import Checkout from './containers/Checkout/Checkout';
import classes from './App.css';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <Layout>
                    <Route path='/burgerbuilder' component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                </Layout>
            </div>
        );
    }
}

export default App;
