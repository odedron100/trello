import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { BoardReducer } from './reducers/BoardReducer';
import { userReducer } from './reducers/userReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  BoardReducer,
  userReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
