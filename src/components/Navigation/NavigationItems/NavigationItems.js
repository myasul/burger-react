import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/burgerbuilder'}>Burger Builder</NavigationItem>
        <NavigationItem link={'/checkout'}>Checkout</NavigationItem>
    </ul>
);

export default navigationItems; 