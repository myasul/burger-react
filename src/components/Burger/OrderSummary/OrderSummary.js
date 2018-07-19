import React from 'react';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    let orderList = [];
    Object.entries(props.ingredients).forEach(
        ([key, value]) => {
            const style = {
                textTransform: 'capitalize'
            }

            orderList.push(
                <li key={key + value}>
                    <span style={style}>{`${key}`}</span> : {`${value}`}
                </li>);
        }
    )

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderList}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' action={props.closeModal}>CANCEL</Button>
            <Button btnType='Success' action={props.continued}>CONTINUE</Button>
        </React.Fragment>
    );
}

export default orderSummary;