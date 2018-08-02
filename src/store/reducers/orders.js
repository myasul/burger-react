import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
}

const checkoutInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
    })
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true, error: false });
}


const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false });
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false, error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.CHECKOUT_INIT): return checkoutInit(state, action);
        case (actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
        case (actionTypes.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state, action);
        case (actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action);
        case (actionTypes.FETCH_ORDERS_START): return fetchOrdersStart(state, action);
        case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrdersSuccess(state, action);
        case (actionTypes.FETCH_ORDERS_FAIL): return fetchOrdersFail(state, action);
        default:
            return state;
    }
}

export default reducer;