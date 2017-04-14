import React, { findDOMNode } from 'react';
import RequestStatus from '../../../../app/scripts/react/components/common/RequestStatus';
import { REQUEST_OK, REQUEST_ERROR, REQUEST_LOADING } from '../../../../app/scripts/react/constants/requestStatus';
import { expect } from 'chai';
import TestUtils from 'react-addons-test-utils';

const { renderIntoDocument } = TestUtils;


// Эти тесты не выполняются. Потому что были привязыны к refs.icon,
// А react 0.14 не позволяет обращаться к refs снаружи

describe('[Component] RequestStatus', () => {
  it.skip('should not have an icon when status is undefined or not in the list', () => {
    const requestUndefStatus = renderIntoDocument(
      <RequestStatus status={void 0} />
    );
    const requestWrongStatus = renderIntoDocument(
      <RequestStatus status={'eeeee'} />
    );

    expect(requestUndefStatus.refs.icon).to.be.undefined;
    expect(requestWrongStatus.refs.icon).to.be.undefined;
  });

  it.skip('should render ok icon on REQUEST_OK status', () => {
    const requestStatus = renderIntoDocument(
      <RequestStatus status={REQUEST_OK} />
    );

    expect(findDOMNode(requestStatus.refs.icon))
      .to.have.property('className').that.contains('fa-check-circle');
  });

  it.skip('should render error icon on REQUEST_ERROR status', () => {
    const requestStatus = renderIntoDocument(
      <RequestStatus status={REQUEST_ERROR} />
    );

    expect(findDOMNode(requestStatus.refs.icon))
      .to.have.property('className').that.contains('fa-exclamation-circle');
  });

  it.skip('should render spinner icon on REQUEST_LOADING status', () => {
    const requestStatus = renderIntoDocument(
      <RequestStatus status={REQUEST_LOADING} />
    );

    expect(findDOMNode(requestStatus.refs.icon))
      .to.have.property('className').that.contains('fa-spinner');
  });
});
