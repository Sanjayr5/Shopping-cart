import React, { useState, useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import Item from '../components/Item';

function HomePage() {
    const [items, setItems] = useState([]);    
    useEffect(() => {
        fetch('/items/',{
            method:'GET'
        }).then(resp => resp.json())
        .then(resp => setItems(resp))  
    }, [])
    return (
        <div>
            <br/>
            <Row>
                {items.map(item => (
                    <Col key={item._id} sm={12} md={6} lg={4}>
                        <Item item={item}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage
