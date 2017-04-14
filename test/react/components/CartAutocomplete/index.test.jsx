/*global describe, it */
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import CartAutocomplete from '../../../../app/scripts/react/components/CartAutocomplete';

const {
  renderIntoDocument,
} = TestUtils;

describe('[Component] CartAutocomplete', () => {
  it('should render without errors', () => {
    expect(() => renderIntoDocument(<CartAutocomplete />)).not.to.throw();
  });
});
