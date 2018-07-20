import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div onClick={props.openSideDrawer} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default drawerToggle;    