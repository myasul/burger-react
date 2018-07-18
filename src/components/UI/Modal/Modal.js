import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    const style = {
        transform: props.displayModal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.displayModal ? 1 : 0
    }

    return (
        <React.Fragment>
            {props.displayModal ? <Backdrop closeModal={props.closeModal} /> : null}
            <div
                className={classes.Modal}
                style={style}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default modal;