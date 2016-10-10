/*global describe, it */
import React, { addons } from 'react';
import { expect } from 'chai';
import CartAutocomplete from '../../../../app/scripts/react/components/CartAutocomplete';

const {
  renderIntoDocument,
} = addons.TestUtils;

describe('[Component] CartAutocomplete', () => {
  it('should render without errors', () => {
    expect(() => renderIntoDocument(<CartAutocomplete />)).not.to.throw();
  });
});
