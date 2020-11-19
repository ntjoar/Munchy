import React, { Component } from "react";

export default class RecipeModal extends Component {
    render() {
        return this.props.show ? (
            <div className='searchbar'>
                    <input className='searchinput' placeholder='Enter your recipe or item...'/>
                    <div className='prefbutton'>Search</div>
            </div>
        ) : null
    }
}