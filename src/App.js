import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuider';
import classes from './App.css';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
