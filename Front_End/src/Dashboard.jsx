import React, { Component } from "react";
import "./Dashboard.css";

import Item from './Item';

export default class Dashboard extends Component {
    render() {
        return (
            <div className='container'>
                <div className='topbuttonrow'>
                    <div className='prefbutton'>+ Recipe</div>
                    <div className='prefbutton'>+ Item</div>
                    <div className='storeprefbutton'>Store Preference Selection</div>
                </div>
                
                <div className='dashboard'>
                    <Item />
                    <Item />
                </div>

                <div className='bottombuttonrow'>
                    <div className='clearbutton'>Clear</div>
                    <div className='searchbutton'>Search</div>
                </div>
            </div>
        );
    }
}