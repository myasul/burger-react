import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';


const toolbar = () => (
    <div className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>...</nav>
    </div>
);


export default toolbar;