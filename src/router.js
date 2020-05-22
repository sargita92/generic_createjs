import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/products';
import Create from './pages/create';
import Edite from './pages/edit';

const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/products/:id" component={Product}/>
            <Route path="/create" component={Create}/>
            <Route path="/edite/:id" component={Edite}/>
        </Switch>
    </BrowserRouter>

);

export default Routes;