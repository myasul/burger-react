import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
    <div
        onClick={props.close}
        className={classes.Backdrop} />
)

export default backdrop 