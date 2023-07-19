import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { Tasks } from './tasks'

export const ConfigureStore =()=>{
    const store = createStore(
        combineReducers({
            tasks: Tasks
        }),
        applyMiddleware(thunk)
    )
    return store;
}