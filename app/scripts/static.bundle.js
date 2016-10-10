global.CartAutocompleteSample = React.createClass({
  render() {
    return (
      <CartAutocomplete {...require('../../test/fixtures/CartAutocomplete/sample.json')} />
    );
  },
});
