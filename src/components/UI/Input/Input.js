import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.elementValue} />
            break;
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.elementValue} />
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.elementValue} />

    }

    return (
        <div className={classes.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;