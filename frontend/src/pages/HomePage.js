import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormControl, SplitButton, Dropdown, InputGroup } from 'react-bootstrap';
import Item from '../components/Item';

function HomePage() {
    const [search, setSearch] = useState("");
    // const [issearch, setIssearch] = useState(false);
    // const [sort, setSort] = useState("");
    const [items, setItems] = useState([]);
    const filteredItems = items.filter((item) => {
        if (
            item.name.toLowerCase().includes(search)
        ) {
          return item;
        }
      });
    const Items = filteredItems ? filteredItems : items
    useEffect(() => {
        fetch(`/items`,{
            method:'GET'
        }).then(resp => resp.json())
        .then(resp => setItems(resp))  
    }, [])
    return (
        <div>
            <br/>
            <Row className="justify-content-end">
            <Form inline>
                {/* {issearch ?
                    <Col>
                        <FormControl  type="text" placeholder="Filter Products by Keyword" className="pull-right"  onChange={(e) => setSearch(e.target.value.toLowerCase())}/> 
                    </Col>
                    : 
                    <Col></Col>
                } */}
                <Col>
                        <FormControl  type="text" placeholder="Filter Products by Keyword" className="pull-right"  onChange={(e) => setSearch(e.target.value.toLowerCase())}/> 
                    </Col>
                {/* <Col>
                    <SplitButton key="down" drop="down" variant="outline-dark" title="Filter" >
                            <Dropdown.Item onClick={() => setIssearch(true)}>Search by Keyword</Dropdown.Item>
                                <Dropdown.Item >Sort by Increasing Order</Dropdown.Item>
                                <Dropdown.Item >Sort by Decreasing Order</Dropdown.Item>
                    </SplitButton>
                </Col> */}
                </Form>
            </Row>
            <br/>
            <Row>
                {Items.map(item => (
                    <Col key={item._id} sm={12} md={6} lg={4}>
                        <Item item={item}/>
                    </Col>
                ))}
            </Row>
            <br/>
        </div>
    )
}

export default HomePage
