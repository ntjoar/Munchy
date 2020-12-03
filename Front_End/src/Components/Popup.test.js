import React from 'react';
import renderer from 'react-test-renderer';

import PopupPrompt from './Popup';

it('renders correctly when adding ingredients', () => {
    const isOpenItem = true;
    const tree = renderer.create(
    <PopupPrompt isOpen={isOpenItem}>
        Please Enter the Ingredient
    </PopupPrompt>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly when adding recipe URL', () => {
    const isOpenItem = true;
    const recipePromptMessage = "Please Enter the Recipe URL";
    const tree = renderer.create(
    <PopupPrompt isOpen={isOpenItem}>
        {recipePromptMessage}
    </PopupPrompt>).toJSON();
    expect(tree).toMatchSnapshot();
});

