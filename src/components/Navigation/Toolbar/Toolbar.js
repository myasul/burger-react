import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';


const toolbar = () => (
    <div className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItem />
        </nav>
    </div>
);


export default toolbar;