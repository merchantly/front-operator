import React, { addons, PropTypes } from 'react';
import sinon from 'sinon';
import PropertiesManager from '../../../../app/scripts/react/components/PropertiesManager';
import { expect } from 'chai';

const { renderIntoDocument } = addons.TestUtils;

describe('[Component] PropertiesManager', () => {
  it('should render with default props without errors', () => {
    const renderedComponent = renderIntoDocument(
      <PropertiesManager />
    );
    expect(renderedComponent).to.be.an('object');
  });
});
