import React, { Proptypes } from 'react';

export default class CategoryCreateForm {
  render() {
    return (
      <Row>
        <Col md={12}>
          <div className="form-group string required category_name">
            <label className="string required control-label" htmlFor="category_name">Название</label>
            <input autofocus="autofocus" className="string form-control" type="text" />
          </div>
        </Col>
      </Row>
    );
  }
}