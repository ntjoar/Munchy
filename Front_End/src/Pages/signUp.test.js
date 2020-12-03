import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from "../store";

import SignUp from './signUp';

it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><SignUp /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});