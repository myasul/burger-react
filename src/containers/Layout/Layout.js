import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    openSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }


    render() {
        return (
            <Fragment>
                <Toolbar openSideDrawer={this.openSideDrawerHandler} />
                <SideDrawer
                    isOpen={this.state.showSideDrawer}
                    close={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;