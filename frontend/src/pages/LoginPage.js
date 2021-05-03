import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { login, register } from '../userActions';
import validator from 'validator';

function LoginPage(props){
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [ isLoginView, setIsLoginView ] = useState(true);
    const [alert, setAlert] = useState('')
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error } = userLogin
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userLogin ? userLogin : userRegister

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, userInfo, redirect])

    const clickedLogin = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        
    }

    const clickedRegister = (e) => {
        e.preventDefault()
        if(name.length >= 3){
            if(validator.isEmail(email)){
                if(password === confirmPassword ){
                    dispatch(register(name, email, password))
                }else{
                    setAlert('Passwords did not match. Please Enter correctly.')
                }
            }else{
                setAlert('Please Enter a valid email address.')
            }
        }else{
            setAlert('Please enter a valid name (size should be > 2). ')
        }
         
    }
    const loginisDisabled = email.length === 0 || password.length === 0;
    const registerisDisabled = name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length ===0;

    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} >
                <Form>
                    {isLoginView ? 
                    <div>
                        <h1>Sign In</h1>
                        {error && <Alert variant="warning"> {error} </Alert>}
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={evt => setEmail(evt.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={evt=> setPassword(evt.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                        :
                    <div>
                        <h1>Register</h1>
                        {alert && <Alert variant="warning"> {alert} </Alert>}
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={evt => setEmail(evt.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={evt=> setPassword(evt.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} >
                        </Form.Control>
                </Form.Group>
                    </div>
                    
                    }
                    { isLoginView ?
                        <Button variant="primary" onClick={clickedLogin} disabled={loginisDisabled}>Sign In</Button> : 
                        <Button variant="primary" onClick={clickedRegister} disabled={registerisDisabled}>Register</Button>
                    }
                 </Form>
                
            <Row className='py-3'>
                <Col>
                { isLoginView ?
                    <div>New User? <Link onClick={() => setIsLoginView(false)}>Register</Link></div> :
                    <div>Has an Account? <Link onClick={() => setIsLoginView(true)}>Sign In</Link></div>    
                }
                </Col>
            </Row>
            </Col>
            </Row>
        </Container>    
      ) 
}
export default LoginPage