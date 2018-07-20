import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {

    let sideDrawerClasses = [classes.SideDrawer];
    if (props.isOpen) {
        sideDrawerClasses.push(classes.Open);
    } else {
        sideDrawerClasses.push(classes.Close)
    }

    return (
        <Fragment>
            {props.isOpen ? <Backdrop close={props.close} /> : null}
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    )
}

export default sideDrawer;