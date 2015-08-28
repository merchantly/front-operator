/*global describe, it, global */
import { expect } from 'chai';
import React, { addons } from 'react';
const component = global.SmartCheckbox;
const { isElement } = addons.TestUtils;

describe('[Component] SmartCheckbox', () => {
  it('should exist in global scope', () => {
    expect(component).not.to.be.undefined;
  });

  it('should be rendered into valid react element', () => {
    expect(isElement(<component />)).to.be.true;
  });

  //TODO write more test for public interface
});
