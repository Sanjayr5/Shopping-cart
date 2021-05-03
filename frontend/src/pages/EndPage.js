import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { removeallitemsfromCart } from '../cartAction';
import { addOrder } from '../orderAction';

function EndPage(props) {
    const history = useHistory();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    useEffect(() => {
        dispatch(addOrder({
            orderItems: cart.cartItems,
            totalPrice: cart.totalPrice,
        }))
        dispatch(removeallitemsfromCart())
    }, [dispatch, history])
    
    return (
        <div>
            <br />
            <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>Your Order is Placed. Thanks for the Order. Have a nice Day :)</Card.Title>
                </Card.Body>
            </Card>
        </div>
        
    )
}

export default EndPage


