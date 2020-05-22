import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomeApp from './components/home.js'

import Pizza from './components/Pizza'
import PizzaForm from './components/PizzaForm'

export default function App() {

  return (
    <Router>
    <div>
      <h1>Lambda Eats</h1>
          <Link to='/'>Home</Link>
            <Link to='/pizza'>Order</Link>
            <Link to='/pizza/help'>Help</Link>
        <Switch>
            <Route exact path='/'>
                <HomeApp />
            </Route>
            <Route path='/pizza'>
                <PizzaForm />
                <Pizza/>
            </Route>
        </Switch>
    </div>
   </Router> 
  );
};
