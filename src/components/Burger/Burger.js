import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css';

const burger = (props) => {
    // const transformedIngredients = Object.keys(props.ingredients).map(
    //     igKey => {
    //         return [...Array(props.ingredients[igKey]).fill(0)].map((item, index) => {
    //             return <BurgerIngredient key={igKey + index} type={igKey} />
    //         });
    //     }
    // );
    let transformedIngredients = [];
    Object.entries(props.ingredients).forEach(
        ([key, value]) => {
            for (let i = 0; i < value; i++) {
                transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />);
            }
        }
    );

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;