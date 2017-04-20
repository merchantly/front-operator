import assign from 'react/lib/Object.assign';
import * as ReactBootstrap from './global/vendor/bootstrap';
import ReactDOM from 'react-dom';

assign(global, ReactBootstrap);
global.ReactDOM = ReactDOM;
