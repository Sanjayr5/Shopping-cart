import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Item(props) {
    const history = useHistory();
    const itemHandler = () =>{ 
        let path = `/item/${props.item._id}`; 
        history.push(path);
      }
    return (
        <div>
            <Card class="card border-primary mb-3" style={{maxWidth: '18rem'}}>
                <Card.Img variant="top" src={props.item.image} /> 
                <Card.Body>
                    <Card.Title>{props.item.name}</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col md={5}>
                                <h5 class="text-primary"><small>Rs. </small> {props.item.price}</h5>
                            </Col>
                            <Col md={6}>
                            <small>Rs. </small> <strike>{props.item.mrp}</strike><br/>
                            </Col>
                        </Row>
                    </Card.Text>
                    <Row>
                        <Col md={12}>
                        <Button className='btn-block' onClick={itemHandler}>Product Details</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br />
        </div>
        
        
    )
}

export default Item
