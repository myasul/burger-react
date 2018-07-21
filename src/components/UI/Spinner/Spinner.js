import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    <div style={props.style}>
        <div className={classes.Loader} ></div>
    </div>
);

export default spinner;