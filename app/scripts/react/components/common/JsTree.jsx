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
    nodeCreate: PropTypes.bool,
    nodeDelete: PropTypes.bool,
    nodeRename: PropTypes.bool,
    onChangeSelection: PropTypes.func.isRequired,
    onChangeTree: PropTypes.func,
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
      const { data, selected } = this.props;

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
    },

    componentWillUnmount() {
      this.$container.off();
    },

    checkCb(operation, node) {
      const { nodeCreate, nodeDelete, nodeRename } = this.props;

      return (
        (nodeCreate && operation === 'create_node')
          || (nodeDelete && operation === 'delete_node')
          || (nodeRename && operation === 'rename_node')
      );
    },

    onChange(ev, data) {
      if (data.action === 'select_node' || data.action === 'deselect_node') {
        this.props.onChangeSelection(data.selected.map((el) => parseInt(el, 10)));
      } else if (['create_node', 'rename_node', 'delete_node'].indexOf(data.action) > -1) {
        this.props.onChangeTree(data.node);
      }
    },

    onNodeCreate() {

    },

    onNodeDelete() {
      
    },

    onNodeRename() {
      
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
      const { nodeCreate, nodeDelete, nodeRename } = this.props;
      
      return (
        <div>
          <div className="react-jstree__buttons">
            { nodeCreate
             && <button
                  className="btn btn-primary btn-sm"
                  onClick={this.onNodeCreate.bind(this)}
                  type="button"
                >
                  {'Создать'}
                </button>
            }
            { nodeRename
             && <button
                  className="btn btn-warning btn-sm"
                  onClick={this.onNodeRename.bind(this)}
                  type="button"
                >
                  {'Переименовать'}
                </button>
            }
            { nodeDelete
             && <button
                  className="btn btn-danger btn-sm"
                  onClick={this.onNodeDelete.bind(this)}
                  type="button"
                >
                  {'Удалить'}
                </button>
            }
          </div>
          <div ref="container" />
        </div>
      );
    },
  });
}
