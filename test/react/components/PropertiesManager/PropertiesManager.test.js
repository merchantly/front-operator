import React, { addons, findDOMNode } from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import HiddenInput from '../../../../app/scripts/react/components/common/HiddenInput';
import { PropertiesManager } from '../../../../app/scripts/react/components/PropertiesManager';

const { TestUtils } = addons;

describe('[Component] PropertiesManager', () => {
  it('should render with default props without errors', () => {
    const propertiesManager = TestUtils.renderIntoDocument(
      <PropertiesManager />
    );
    expect(propertiesManager).to.be.an('object');
  });

  it('should render hidden input when there are no list items', () => {
    const propertiesManager = TestUtils.renderIntoDocument(
      <PropertiesManager />
    );
    const input = TestUtils.findRenderedComponentWithType(
      propertiesManager,
      HiddenInput,
    );

    expect(input.props).to.deep.equal({
      name: 'product[custom_attributes][]',
      value: '',
    });
  });

  it('should render hidden input for every existed and then removed PropertyFile', () => {
    const propertyFileIDs = [2050, 2051];
    const props = {
      listItems: [
        {
          id: '8f29c846-ec8e-467b-9faa-6b8188e73a9d',
          propertyID: 66,
          propertyFixed: true
        },
      ],
      properties: [
        {
          id: 66,
          name: 'Размер',
          type: 'PropertyString',
          tooltip: 'Строка'
        },
      ],
      removedProperties: [
        {
          id: propertyFileIDs[0],
          name: 'Файл',
          type: 'PropertyFile',
          tooltip: 'Файл',
        },
        {
          id: propertyFileIDs[1],
          name: 'Файл2',
          type: 'PropertyFile',
          tooltip: 'Файл2',
        },
      ],
      onPropertyCreate: spy(),
      onPropertySwitch: spy(),
      onPropertyUpdate: spy(),
      onPropertyDelete: spy(),
      onListItemDelete: spy(),
    };
    const propertiesManager = TestUtils.renderIntoDocument(
      <PropertiesManager {...props} />
    );
    const inputList = TestUtils.scryRenderedComponentsWithType(
      propertiesManager,
      HiddenInput,
    );

    inputList.forEach((input, i) => {
      expect(input.props).to.deep.equal({
        name: `product[custom_attributes][${propertyFileIDs[i]}][remove_value]`,
        value: '1',
      });
    });
  });
});