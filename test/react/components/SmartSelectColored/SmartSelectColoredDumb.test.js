/*global describe, it */
import React, { findDOMNode } from 'react';
import SmartSelectColoredDumb from '../../../../app/scripts/react/components/SmartSelectColored/SmartSelectColoredDumb';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';

const { renderIntoDocument } = TestUtils;
const testOptions = {
  colored: true,
  disabled: false,
  dropup: false,
  fieldName: 'test',
  onChange: () => {},
  onClose: () => {},
  onOpen: () => {},
  options: [
    { value: 1, title: 'test1', color_rgb: 'rgb(255, 255, 255)' },
    { value: 2, title: 'test2', color_rgb: 'rgb(0, 0, 0)' },
  ],
  value: 1,
};

describe('[Component] SmartSelectColoredDumb', () => {
  const dumb = renderIntoDocument(
      <SmartSelectColoredDumb {...testOptions} />
  );
  const button = findDOMNode(dumb.refs.button);
  const menu = findDOMNode(dumb.refs.menu);

  it('should render correctly option rgb_box when rendered with `colored` props set', () => {
    expect(findDOMNode(dumb.refs['rgb-box-test1']))
      .to.have.property('style').that.has.property('background-color').that.is.equal('rgb(255, 255, 255)');
  });

  it('should render button with proper rgb background', () => {
    expect(button).to.have.property('style').which.has.property('background-color').that.is.equal('rgb(255, 255, 255)');
  });

  it('should not render rgb_box when `colored` is false', () => {
    const unColoredDumb = renderIntoDocument(
      <SmartSelectColoredDumb {...testOptions} colored={false} />
    );

    expect(unColoredDumb.refs['rgb-box-test1']).to.be.undefined;
  });

  it('should have 2 options in the menu', () => {
    expect(menu).to.have.property('children').that.has.property('length').eq(2);
    // thats not an array it's HTMLCollection, that's why we don't use length() method directly. tho it works too )
  });
});
