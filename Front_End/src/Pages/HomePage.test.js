import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from "../store";

import HomePage from './HomePage';

it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><HomePage /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});