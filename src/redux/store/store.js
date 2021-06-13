import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

let composeEnhancers = compose;
const middlewares = [thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
