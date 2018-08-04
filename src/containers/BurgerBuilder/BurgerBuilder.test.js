import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onSetIngredients={() => { }} />);
    });

    it('should render <BuildControls /> elements if ingredients prop is provided', () => {
        wrapper.setProps({ ingredients: { salad: 0 } })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});