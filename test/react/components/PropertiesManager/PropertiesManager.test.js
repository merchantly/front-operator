import React, { addons, findDOMNode } from 'react';
import sinon from 'sinon';
import PropertiesManager from '../../../../app/scripts/react/components/PropertiesManager';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = addons.TestUtils;
const propertyFileID = 2050;
const testOptions = {
  custom_attributes: [{
    value: 1,
    property_id: 2045,
    is_editable: true,
  }, {
    value: {
      url: 'http://3001.vkontraste.ru/uploads/shop/579/uploads/af/2050/4eec520e-2ffc-450c-9499-ed8bf4bc0488.jpeg',
      size: 17231,
      filename: '4eec520e-2ffc-450c-9499-ed8bf4bc0488.jpeg',
      value_cache: null,
      extension: '.jpeg'
    },
    property_id: propertyFileID,
    is_editable: true,
  }],
  properties: [{
    id: 2045,
    name: 'Developer Support',
    type: 'PropertyLong',
    tooltip: 'Целое число',
  }, {
    id: propertyFileID,
    name: 'Файл',
    type: 'PropertyFile',
    tooltip: 'Файл',
  }]
};

describe('[Component] PropertiesManager', () => {
  it('should render with default props without errors', () => {
    const renderedComponent = renderIntoDocument(
      <PropertiesManager />
    );
    expect(renderedComponent).to.be.an('object');
  });

  it('should render hidden input when there are no list items', () => {
    const renderedComponent = renderIntoDocument(
      <PropertiesManager />
    );
    const inputList = scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'input'
    );
    expect(inputList.some((input) => (
      input.props.name === 'product[custom_attributes][]' &&
      input.props.value === ''
    ))).to.be.true;
  });

  it('should render hidden input for every existed and then removed PropertyFile', () => {
    const renderedComponent = renderIntoDocument(
      <PropertiesManager {...testOptions} />
    );
    const listItemID = renderedComponent.state.listItems.filter((item) => (
      item.propertyID === propertyFileID
    ))[0].id;

    renderedComponent.deleteListItem(listItemID);

    const inputList = scryRenderedDOMComponentsWithTag(
      renderedComponent,
      'input'
    );

    expect(inputList.some((input) => (
      input.props.name === `product[custom_attributes][${propertyFileID}][remove_value]` &&
      input.props.value === '1'
    ))).to.be.true;
  });
});