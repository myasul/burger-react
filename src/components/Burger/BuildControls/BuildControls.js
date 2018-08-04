import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { 'label': 'Cheese', 'type': 'cheese' },
    { 'label': 'Meat', 'type': 'meat' },
    { 'label': 'Salad', 'type': 'salad' },
    { 'label': 'Bacon', 'type': 'bacon' },
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                more={() => props.more(ctrl.type)}
                less={() => props.less(ctrl.type)}
                disabledInfo={props.disabledInfo[ctrl.type]} />
        })}
        <button
            onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.isPurchasable}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;