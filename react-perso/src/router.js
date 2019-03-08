import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink  } from 'react-router-dom';
import Login from './login';
import SignUp from './SignUp';
import Profile from "./profile";
import './style.css'


export default class Router extends Component{
    constructor(props){
        super(props);
        this.state={
            autorise: false
        }
    }
    render(){
        return(
            <BrowserRouter>
                <div className="">

                    <nav className="navbar navbar-default">
                        <div className="container">
                            <div className="navbar-header">
                                <div className="nav navbar-nav">
                                    <ul className="row justify-content-between">
                                        <li><NavLink to="/"  className="btn btn-info acceuil">Home</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Switch>

                        <Route exact path="/" component={Login} />
                        <Route path="/SignUp" component={SignUp} />
                        <Route exact path='/Profile/$admin$123' component={Profile} />
                        <Route path="/Profile/:id"  component={Profile} />

                    </Switch>   
                </div>
            </BrowserRouter>
        )
    }
}
