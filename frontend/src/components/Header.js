import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Navbar, Nav, Button, SplitButton, Dropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header(props) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        window.localStorage.clear()
        window.location.reload()
    }
    return (
        <header>
            <Navbar bg="primary" expand="lg"></Navbar>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <LinkContainer  to='/'>
                    <Navbar.Brand><h1>Shopping Cart</h1></Navbar.Brand>
                </LinkContainer>            
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {userInfo ? (
                            <div>
                                <Link to='/'>
                                    <Button variant="outline-primary" title='login' ><i class="bi bi-house" >Home</i> </Button>
                                </Link>&nbsp;&nbsp;&nbsp;
                                <Link to='/cart'>
                                    <Button variant="outline-primary" title='login' ><i class="bi bi-cart4" >Cart</i> </Button>
                                </Link>&nbsp;&nbsp;&nbsp;
                                <SplitButton key="left" drop="left" variant="outline-primary" title={`Hi, ${userInfo.name}`} >
                                    <Dropdown.Item ><Link onClick={logoutHandler} >Logout</Link></Dropdown.Item>
                                </SplitButton>
                            </div>
                        ) : (
                            <Link to='/login'>
                                <Button variant="outline-primary" title='login' ><i class="bi bi-person">Login</i> </Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}
export default Header
