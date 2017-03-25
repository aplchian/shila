import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import centered from '@kadira/react-storybook-decorator-centered';
import { Select } from '../components'


storiesOf('Select', module)
  .addDecorator(centered)
  .add('to Storybook', () => (
    <Select
      selected={selected}
      options={options}
      onSelect={action('saved!')}
    />
  ));

var selected = {
    value: 'today',
    name: 'today'
  }

var options = [
  {
    value: 'today',
    name: 'today'
  },
  {
    value: 'all-time',
    name: 'all time'
  },
  {
    value: 'last-7-days',
    name: 'last 7 days'
  },
  {
    value: 'this-month',
    name: 'this month'
  },
]