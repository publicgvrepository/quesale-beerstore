import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk  from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {responsiveStoreEnhancer} from 'redux-responsive'
import reducer from "./reducers"

const middleware = (process.env.NODE_ENV === 'development') ? applyMiddleware(promise(), thunk, logger()) : applyMiddleware(promise(), thunk);
export default createStore(reducer, responsiveStoreEnhancer, middleware);
