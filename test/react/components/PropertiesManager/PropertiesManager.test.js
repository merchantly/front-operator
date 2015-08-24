import React, { addons, PropTypes } from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import PropertiesManager from '../../../../app/scripts/react/components/PropertiesManager';
const { renderIntoDocument } = addons.TestUtils;

describe('[Component] PropertiesManager', () => {
  it('should render with default props without errors', () => {
    const renderedComponent = renderIntoDocument(
      <PropertiesManager />
    );
    expect(renderedComponent).to.be.an('object');
  });
});