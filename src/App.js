import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Router, Switch, BrowserRouter, Link} from "react-router-dom";
import routes from './routes';
import RouteComponent from "./Components/RouteComponent";



function App() {
    return (
        <BrowserRouter>
            <RouteComponent />
        </BrowserRouter>
    );
}

export default App;
