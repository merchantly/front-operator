import React, { PropTypes } from 'react';

export default class CategoryCreateForm {
  static propTypes = {
    category: PropTypes.object.isRequired,
    parentCategory: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  }
  render() {
    const { category, parentCategory } = this.props;

    return (
      <span>
        <Row>
          <Col md={12}>
            <div className="form-group">
              <label className="control-label" htmlFor="category_name">
                Название
              </label>
              <input
                autoFocus={true}
                className="form-control"
                id="category_name"
                onChange={this.handleTextFieldChange.bind(this, 'name')}
                type="text"
                value={category.name}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="form-group">
              <label className="control-label" htmlFor="category_name">
                Родительская категория
              </label>
              <h4>{parentCategory.text}</h4>
            </div>
          </Col>
        </Row>
      </span>
    );
  }
  handleTextFieldChange(fieldName, ev) {
    const value = ev.target.value;
    this.props.onFieldChange(fieldName, value);
  }
}