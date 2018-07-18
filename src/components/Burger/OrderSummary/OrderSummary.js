import React from 'react';

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
            <p>Continue or Checkout?</p>
        </React.Fragment>
    );
}

export default orderSummary;