/*global $ */
import React, { findDOMNode, PropTypes } from 'react';
import { diff } from 'deep-diff';

export default function JsTree(props) {
  JsTree.propTypes = {
    canCreate: PropTypes.bool,
    canDelete: PropTypes.bool,
    canRename: PropTypes.bool,
    //TODO elaborate a bit on correct array type description
    data: PropTypes.shape({
      core: PropTypes.shape({
        data: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    onChangeSelection: PropTypes.func.isRequired,
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
          || this.props.edited !== nextProps.edited
          || diff(this.props.selected, nextProps.selected)
          || false
      );
    },

    componentDidMount() {
      const { data: rawData, selected } = this.props;
      //TODO install deepmerge when things get more complicated
      const data = {
        ...rawData,
        core: {
          ...rawData.core,
          check_callback: this.checkCb.bind(this),
        },
      };
      const container = findDOMNode(this.refs.container);

      if (!(container instanceof HTMLElement)) {
        return;
      } else {
        this.$container = $(container);
      }

      this.$container.jstree(selected ? this.extendWithSelected(data, selected) : data);
      this.$container.on('changed.jstree', this.onChange.bind(this));
    },

    componentDidUpdate(prevProps) {
      const { data, selected, edited, onNodeRename } = this.props;

      if (diff(this.props.data, prevProps.data)) {
        this.$container.jstree(true).settings.core = data.core;
        this.$container.jstree(true).refresh();
      }

      if (selected) {
        this.$container.jstree(true).deselect_all(true);
        if (selected.length) {
          this.$container.jstree(true).select_node(selected, { suppress_event: true });
        }
      }

      if (edited && edited !== prevProps.edited) {
        this.$container.jstree(true).edit(edited, null, this.onNodeEdit.bind(this));
      }
    },

    componentWillUnmount() {
      this.$container.off();
    },

    checkCb(operation, node) {
      const { canCreate, canDelete, canRename } = this.props;

      return (
        (canCreate && operation === 'create_node')
          || (canDelete && operation === 'delete_node')
          || (canRename && operation === 'rename_node')
      );
    },

    onChange(ev, data) {
      if (data.action === 'select_node' || data.action === 'deselect_node') {
        this.props.onChangeSelection(data.selected.map((el) => parseInt(el, 10)));
      }
    },

    onNodeCreate() {
      const { data, newNodeText } = this.props;
      const selected = this.$container.jstree(true).get_top_selected();

      if (!selected.length) {
        window.alert('Выберите родительскую категорию')
      } else {
        const parentID = selected[0];
        this.$container.jstree(true).create_node(parentID, { text: newNodeText }, 'first', (node) => {
          const { onNodeCreate } = this.props;
          if (onNodeCreate) { onNodeCreate(node); }
        });
      }
    },

    onNodeRename() {
      const selected = this.$container.jstree(true).get_top_selected();

      if (!selected.length) {
        window.alert('Выберите категорию, которую хотите переименовать');
      } else {
        const node = selected[selected.length - 1];

        this.$container.jstree(true).edit(node, null, this.onNodeEdit.bind(this));
      }
    },

    onNodeEdit(node, nv, isCancelled) {
      const { onNodeRename } = this.props;

      if (onNodeRename) {
        onNodeRename(node, isCancelled);
      }
    },

    setSelectedState(categories, selected) {
      return categories.map((el) => {
        if (el.children instanceof Array && el.children.length) {
          return {
            ...el,
            state: {
              ...el.state,
              selected: selected.indexOf(el.id) > -1,
            },
            children: this.setSelectedState(el.children, selected),
          };
        } else {
          return {
            ...el,  
            state: {
              ...el.state,
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
      return <div ref="container" />;
    },
  });
}