import React from 'react';
import renderer from 'react-test-renderer';

import StorePrefPopupPrompt from './StorePrefPopup';

it('renders correctly when open', () => {
    const storePrefIsOpen = true;
    const tree = renderer.create(<StorePrefPopupPrompt isOpen={storePrefIsOpen}/>).toJSON();
    expect(tree).toMatchSnapshot();
});