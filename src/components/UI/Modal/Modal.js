import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.displayModal !== this.props.displayModal ||
            nextProps.children !== this.props.children;
    }

    render() {
        const style = {
            transform: this.props.displayModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.displayModal ? 1 : 0
        }

        return (
            <React.Fragment>
                {this.props.displayModal ? <Backdrop closeModal={this.props.close} /> : null}
                <div
                    className={classes.Modal}
                    style={style}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;   