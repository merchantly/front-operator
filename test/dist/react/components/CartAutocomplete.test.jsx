/*global describe, it, global */
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
const component = global.CartAutocomplete;
const { isElement } = TestUtils;

describe('[Component] CartAutocomplete', () => {
  it('should exist in global scope', () => {
    expect(component).not.to.be.undefined;
  });

  it('should be rendered into valid react element', () => {
    expect(isElement(<component />)).to.be.true;
  });

  //TODO write more test for public interface
});
