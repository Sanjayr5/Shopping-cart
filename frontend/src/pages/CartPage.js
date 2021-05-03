import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Form, Button, Card, Alert, Figure, ListGroupItem} from 'react-bootstrap';
import { addtoCart, removefromCart } from '../cartAction';

function CartPage(props) {
    const itemId = props.match.params.id ? props.match.params.id : 0
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        userInfo ? (
            dispatch(addtoCart(itemId, qty))
        ) : (
            props.history.push('/login?redirect=cart')
        )
    }, [dispatch, itemId, qty])

    const removefromcartHandler = (id) => {
        dispatch(removefromCart(id))
    }
    const orderHandler = () => {
        props.history.push('/login?redirect=end')
    }

    return (
        <div>
            <br />
            <Row>
                <Col md = {8}>
                <Card>
                    <Card.Header>Cart Items</Card.Header>
                    {cartItems.length === 0 ? (
                        <Alert>
                            <h3>No items in the Cart :( </h3> To add Items 
                                <Link to='/'> Go back  </Link> to Home page
                        </Alert>
                        
                        ) : (
                            <Card.Body>
                                {/* <Card.Title>Cart Items</Card.Title> */}
                                <Card.Text>
                                <ListGroup>
                                    {cartItems.map( x => (
                                            <Row key={x.item}>
                                                <Col md={2}>
                                                    <Figure>
                                                        <Figure.Image width={60} height={60} alt="60x60" src={x.image} />
                                                    </Figure>
                                                </Col>
                                                <Col md={4}>
                                                    <Link to={`/item/${x.item}`}> {x.name} </Link>
                                                </Col>
                                                <Col md={2}>
                                                    Rs. {x.price}
                                                </Col>
                                                <Col md={2}>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Control as="select" value={x.qty} onChange={(e) => dispatch(addtoCart(x.item, Number(e.target.value)))}>
                                                    <option key={1} value={1}>1</option>
                                                    <option key={2} value={2}>2</option>
                                                    <option key={3} value={3}>3</option>
                                                    <option key={4} value={4}>4</option>
                                                    <option key={5} value={5}>5</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                </Col>
                                                <Col md={2}>
                                                <Button variant="link" onClick={() => removefromcartHandler(x.item)}>
                                                Delete
                                                </Button>
                                                </Col>
                                            </Row>
                                    
                                    ))}
                                </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        )
                    }
                </Card>
                </Col>
                <Col md = {4}>
                <Card>
                    <Card.Header>Cart Overview</Card.Header>
                    <Card.Body>
                        {/* <Card.Title>Shopping Cart</Card.Title> */}
                        <ListGroup variant="flush">
                                {cartItems.map( x => (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={1}> {x.qty} </Col>
                                            <Col md={1}>x</Col>
                                            <Col md={4}>{x.price}</Col>
                                            <Col md={1}>=</Col>
                                            <Col md={4}> Rs. {x.qty * x.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup>
                                <ListGroup.Item>
                                <Row>
                                    <Col md={5}>Total Qty :</Col>
                                    <Col md={6}> <h5 className="text-success">{cartItems.reduce((acc, cart_item) => acc + cart_item.qty, 0)}</h5> </Col>
                                </Row>
                                <Row>
                                    <Col md={5}>Total Cost :</Col>
                                    <Col md={6} ><h5 className="text-success"><small>Rs. </small>{cartItems.reduce((acc, cart_item) => acc + cart_item.qty * cart_item.price, 0).toFixed(2)} <small>/-</small></h5></Col>
                                </Row>
                                </ListGroup.Item>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Button type = 'button' className='btn-block'  disabled={cartItems.length === 0} onClick={orderHandler}>Place Order </Button>
                                </ListGroupItem>
                            </ListGroup>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            
        </div>
        
    )
}

export default CartPage
