import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <DrawerToggle openSideDrawer={props.openSideDrawer}>MENU</DrawerToggle>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItem />
        </nav>
    </div>
);


export default toolbar;