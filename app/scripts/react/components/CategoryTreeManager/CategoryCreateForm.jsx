import React, { Component, PropTypes } from 'react';

export default class CategoryCreateForm extends Component {
  static propTypes = {
    nameTitle: PropTypes.string.isRequired,
  }
  state = {
    category: this.getDefaultCategory()
  }
  render() {
    const { nameTitle } = this.props;

    return (
      <Row>
        <Col md={12}>
          <div className="form-group">
            <label className="control-label" htmlFor="category_name">
              {nameTitle}
            </label>
            <input
              autoFocus={true}
              className="form-control"
              id="category_name"
              onChange={this.onNameChange.bind(this)}
              type="text"
              value={this.state.category.name}
            />
          </div>
        </Col>
      </Row>
    );
  }
  getDefaultCategory() {
    return { name: '' };
  }
  getCategory() {
    return this.state.category;
  }
  resetData() {
    this.setState({ category: this.getDefaultCategory() })
  }
  onNameChange(e) {
    this.setState({
      category: {
        ...this.state.data,
        name: e.target.value
      }
    });
  }
}