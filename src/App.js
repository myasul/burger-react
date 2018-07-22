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
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/' component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
