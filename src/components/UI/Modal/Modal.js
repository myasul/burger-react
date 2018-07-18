import React from 'react';
import classes from './Modal.css';

const modal = (props) => {

    const style = {
        transform: props.displayModal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.displayModal ? 1 : 0
    }

    return (<div
        className={classes.Modal}
        style={style}>
        {props.children}
    </div>)
}

export default modal;