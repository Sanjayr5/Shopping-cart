import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './cartReducers';
import { userLoginReducer, userregisterReducer } from './userReducers';
import { addorderReducer } from './orderReducer';

const reducer = combineReducers({
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userregisterReducer,
    orderAdd: addorderReducer,
})

const itemsfromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems: itemsfromStorage},
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]


const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store