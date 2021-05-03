import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { HashRouter, Route } from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import EndPage from './pages/EndPage';

function App() {
  return (
      <HashRouter>
      <Header/>
        <Container>
          <Route path = '/login' component={LoginPage} exact />
          <Route path = '/' component={HomePage} exact />
          <Route path='/item/:id' component={ItemPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/end' component={EndPage} />
        </Container>
        <br />
      <Footer/>
      </HashRouter>
    
  );
}

export default App;
