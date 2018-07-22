import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.SpinnerContainer}>
        <div className={classes.Loader} ></div>
    </div>
);

export default spinner;