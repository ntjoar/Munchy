import React, { Component } from "react";
import "./Item.css";

export default class Item extends Component {
    render() {
        return (
            <div className='itemcontainer'>
                <button>X</button>
                <div>ITEM</div>
            </div>
        );
    }
}