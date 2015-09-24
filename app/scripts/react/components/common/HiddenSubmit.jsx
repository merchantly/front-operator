import React from 'react';

export default class HiddenSubmit {
  render() {
    return (
      <input
        style={{ position: 'absolute', left: -9999, width: 1, height: 1 }}
        tabIndex="-1"
        type="submit"
      />
    );
  }
}