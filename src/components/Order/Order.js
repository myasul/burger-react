import React from 'react';
import classes from './Order.css';

const order = (props) => {

    let ingredients = [];
    Object.entries(props.ingredients).forEach(([key, value]) => {
        ingredients.push(
            <span
                className={classes.Ingredient}
                key={key}>
                {`${key} (${value}) `}
            </span>);
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;