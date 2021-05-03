import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, ListGroup, Figure, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';

function ItemPage(props) {
    const [qty, setQty] = useState(1)
    const [item, setItem] = useState([])
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    useEffect(() => {
        userInfo ? (
            fetch(`/item/${props.match.params.id}`,{
                method:'GET'
            }).then(resp => resp.json())
            .then(resp => setItem(resp))
        ) : (
            props.history.push(`/login?redirect=/item/${props.match.params.id}`)
        )
          
    })
    const addtocartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
    }
    return (
        <div> <br />
        <Row>
            <Link to='/'>
                <Button class="btn btn-outline-primary">Go Back</Button>
            </Link>
        </Row>
        <Row>
            <Col md={5}>
                <Figure>
                    <Figure.Image width={500} height={500} alt="500x500" src={item.image} />
                </Figure>
            </Col>
            <Col md={7}>
                <Row>
                    <Col md={8}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item >
                                    <h3>{item.name}</h3>Brand: <b>{item.brand}</b>
                                </ListGroup.Item>
                                <ListGroup.Item> 
                                    <Row>
                                        <Col md = {4}>
                                            <small>Price: </small><h5 class="text-success"><small>Rs. </small>{item.price}</h5>
                                            <small>(Inc. All Taxes) </small>
                                        </Col>
                                        <Col md = {4}>
                                            <small>MRP: </small><h6><small>Rs. </small> <strike>{item.mrp}</strike> </h6>
                                        </Col>
                                        <Col md = {4}>
                                            <small>You Save: </small><h6><small>Rs. </small><b class="text-primary"> {item.mrp - item.price}.00</b> </h6>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                    </Form.Control>
                                </Form.Group>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' onClick = {addtocartHandler}>Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row><br/>
                <Row>
                    <Col md = {12}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item ><h5 class="text-info text-center"><b>Description</b></h5> {item.description}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
    )
}

export default ItemPage
