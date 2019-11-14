// __tests__/TrackItem-test.js
import React from 'react';
import TrackItem from '../../component/TrackItem';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<TrackItem text="TestName" value="TestValue"/>).toJSON();
  expect(tree).toMatchSnapshot();
});