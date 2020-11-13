import React, { Component } from "react";
import "./Item.css";

export default class Item extends Component {
    render() {
        return (
            <div className='itemcontainer'>
                <div className='removebutton'>X</div>
                <div className='itemname'>ITEM</div>
            </div>
        );
    }
}