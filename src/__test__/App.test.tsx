import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('should', () => {
    const componentWrapper = shallow(<App />);
    expect(componentWrapper).toMatchSnapshot();
  });
});
