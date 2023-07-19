import { Accordion } from 'reactstrap';
import * as ActionTypes from './ActionTypes';

export const Tasks=(state={
    isLoading: true,
    errMess: null,
    tasks: []
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_TASK:
            return {...state,isLoading:false, errMess:null, tasks:action.payload}
        case ActionTypes.TASK_LOADING:
            return {...state, isLoading:true, errMess: null, tasks: []}
        case ActionTypes.TASK_FAILED:
            return {...state, isLoading:false, errMess:action.payload, tasks:[]}
        default:
            return state
    }
}