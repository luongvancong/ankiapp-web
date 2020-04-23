import React from 'react';
import "./assets/scss/main.scss";

import {BrowserRouter} from "react-router-dom";
import RouteComponent from "./Components/RouteComponent";



function App() {
    return (
        <BrowserRouter>
            <RouteComponent />
        </BrowserRouter>
    );
}

export default App;
