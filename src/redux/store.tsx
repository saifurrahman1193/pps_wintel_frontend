import { createStore } from 'redux'
import mainReducer from './reducer' 
// import thunk from 'redux-thunk'
// import logger from "redux-logger";
import { persistStore } from 'redux-persist'

export const store = createStore(mainReducer)

// export const store = import.meta.env.NODE_ENV === "development"
//     ? createStore(mainReducer,applyMiddleware(logger, thunk))
//     : createStore(mainReducer,applyMiddleware(thunk));

export const persistor = persistStore(store)