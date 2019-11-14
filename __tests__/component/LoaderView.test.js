// __tests__/LoaderView-test.js
import React from 'react';
import LoaderView from '../../component/LoaderView';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<LoaderView />).toJSON();
  expect(tree).toMatchSnapshot();
});