import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <Burger style={{ width: '100%', margin: 'auto' }} ingredients={props.ingredients} />
            <Button btnType={'Danger'}>CANCEL</Button>
            <Button btnType={'Success'}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;