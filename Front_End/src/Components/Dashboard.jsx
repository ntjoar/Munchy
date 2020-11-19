import React, { Component, Fragment } from "react";
import "../CSS/Dashboard.css";

import Item from './Item';
import RecipeModal from './RecipeModal';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecipeModal: false,
            showItemModal: false
        };
    }

    toggleRecipeModal = () => {
        let cur_state = this.state.showRecipeModal;
        this.setState({showRecipeModal: !cur_state});
    }

    render() {
        return (
            <div className='container'>
                <div className='topbuttonrow'>
                    <div className='topleft'>
                        <div className='prefbutton' onClick={this.toggleRecipeModal}>+ Recipe</div>
                        <div className='prefbutton'>+ Item</div>
                    </div>
                    <div className='topright'>
                        <div className='storeprefbutton'>Store Preference Selection</div>
                    </div>
                </div>
                <RecipeModal show={this.state.showRecipeModal}/>
                <div className='dashboard'>
                    <Item />
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