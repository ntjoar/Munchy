import React, { Component } from "react";
import "./Dashboard.css";

import Item from './Item';

export default class Dashboard extends Component {
    render() {
        return (
            <div className='container'>
                <div className='topbuttonrow'>
                    <button className='prefbutton'>+ Recipe</button>
                    <button className='prefbutton'>+ Item</button>
                    <button className='storeprefbutton'>Store Preference Selection</button>
                </div>
                
                <div className='dashboard'>
                    <Item />
                    <Item />
                </div>

                <div className='bottombuttonrow'>
                    <button className='clearbutton'>Clear</button>
                    <button className='searchbutton'>Search</button>
                </div>
            </div>
        );
    }
}