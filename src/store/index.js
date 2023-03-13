/// We use compose to combine in store creation enhacners and redux devtools 
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'    /// Really popular and placed in almost every project. Allows to send as action function (in function can be asynk code - best benefit of thunk)
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

/// Crating our own middleware 
const stringMiddleware = (store /* {dispatch, getState} */) => (next /* dispatch */) => (action) => {    /// We do not get in this function whole store but only dispatch and getState 
  if (typeof action === 'string') {     
    return next({               
      type: action
    })
  }
  return next(action);                   
};


/// Usually enhancers and midwares we can take already created from small libraries 
const enhancer = (createStore) => (...args) => {      /// Custom enhancer. We doing this for case if in dispatch we get not object but string for example 
  const store = createStore(...args);

  const oldDispatch = store.dispatch;     /// Saved Link to old original dispatch that had object 
  store.dispatch = (action) => {          /// Taking original dispatch that was inside store and change it. 
    if (typeof action === 'string') {     /// If type of action that came in this function is string we call original dispatch and give to it object  
      return oldDispatch({                /// inside that object we have type were we place action that we get 
        type: action
      })
    }
    return oldDispatch(action);                   /// If we get inside not string we just return original dispatch.  
  }
  return store;                           /// Here we returning changed store with one of dispatches from function.
}

const store = createStore(
                combineReducers({ heroes, filters }),
                compose(            /// applyMiddleware we can use to connect stringMiddleware but it will not take second parametr as REDUX EXTENSION so we need compose 
                  applyMiddleware(ReduxThunk, stringMiddleware),
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                )

                // applyMiddleware(stringMiddleware)  /// applyMiddleware we can use to connect stringMiddleware but it will not take second parametr as REDUX EXTENSION so we need compose 

                // compose(
                //   enhancer,         /// We have functioanlity inside of createStore where if we have second atribute it will take it as helping enhancer
                //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                // )
);

export default store;

