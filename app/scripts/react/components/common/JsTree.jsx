/*global $ */
import React, { findDOMNode, PropTypes } from 'react';
import { diff } from 'deep-diff';

export default function JsTree(props) {
  JsTree.propTypes = {
    //TODO elaborate a bit on correct array type description
    data: PropTypes.shape({
      core: PropTypes.shape({
        data: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.array,
  };

  return ({
    props,
    $container: void 0,

    shouldComponentUpdate(nextProps) {
      // we cannot compare directly this.props and nextProps because
      // onChange.bind() !== onChange.bind()
      return (
        diff(this.props.data, nextProps.data)
          || diff(this.props.selected, nextProps.selected)
          || false
      );      
    },

    componentDidMount() {
      const { data, selected } = this.props;
      const container = findDOMNode(this.refs.container);

      if (!(container instanceof HTMLElement)) {
        return;
      } else {
        this.$container = $(container);
      }

      this.$container.jstree(selected ? this.extendWithSelected(data, selected) : data);
      this.$container.on('changed.jstree', this.onChange.bind(this));
    },

    componentDidUpdate() {
      const { data, selected } = this.props;
      
      this.$container.jstree(true).settings.core = data.core;
      if (selected) {
        this.$container.jstree(true).deselect_all(true);
        if (selected.length) {
          this.$container.jstree(true).select_node(selected, { suppress_event: true });
        }
      }
      this.$container.jstree(true).refresh();
    },

    componentWillUnmount() {
      this.$container.off();
    },

    onChange(ev, data) {
      if (data.action === 'select_node' || data.action === 'deselect_node') {
        this.props.onChange(data.selected.map((el) => parseInt(el, 10)));
      }
    },

    setSelectedState(categories, selected) {
      return categories.map((el) => {
        if (el.children instanceof Array && el.children.length) {
          return {
            ...el,
            state: {
              selected: selected.indexOf(el.id) > -1,
            },
            children: this.setSelectedState(el.children, selected),
          };
        } else {
          return {
            ...el,  
            state: {
              selected: selected.indexOf(el.id) > -1,
            },
          };
        }
      });
    },

    extendWithSelected(data, selected) {
      return {
        ...data,
        core: {
          ...data.core,
          data: this.setSelectedState(data.core.data, selected),
        },
      };
    },

    render() {
      return (
        <div ref="container" />
      );
    },
  });
}
