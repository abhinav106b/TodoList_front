import * as ActionTypes from './ActionTypes';


export const FetchTasks =()=>(dispatch)=>{
    dispatch(TaskLoading(true));
    fetch('http://localhost:8000/tasks')
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err= new Error("Error "+response.status+": ",+response.statusText);
            err.response= response;
            throw err;
        }
    },err =>{
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then((res)=>res.json())
    .then((task)=>dispatch(AddTask(task)))
    .catch((err)=>dispatch(TaskFailed(err.message)));
    
}

export const PostTask =(task) =>(dispatch) =>{
    fetch("http://localhost:8000/tasks",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
    })
    .then((response)=>{
        if(response.ok){
            return response
        }
        else{
            var err = new Error("Error ",+response.status+" : "+response.statusText );
            throw err;
        }
    },err=>{
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then((response)=> response.json())
    .then((res)=>{console.log("Action creators post ",res)})
    .catch((err)=>{console.log("Error occured : ",err.message)})
}

export const EditTask=(taskid,task) =>(dispatch)=>{
    fetch('http://localhost:8000/tasks/'+taskid,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(task)
    })
    .then((response)=> {
        if(response.ok){
            return response
        }
        else{
            var err = new Error("Error "+response.status+": "+response.statusText);
            throw err;
        }
    },(err)=>{
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then((res)=> res.json())
    .then((task)=>{
        console.log("Actioncreators edit ",task);
    })
    .catch((err)=> alert(err.message));
}

export const DeleteTask =(taskId) =>(dispatch) =>{
    fetch('http://localhost:8000/tasks/'+taskId,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>{
        if(response.ok){
            return response;
        }
        else{
            var err= new Error("Error "+response.status+": ",+response.statusText);
            err.response= response;
            throw err;
        }
    },err =>{
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then((res)=>res.json())
    .then((res)=>{
        return res;
    })
    .then((finalTask)=>{
        console.log("Actioncreators delete ",finalTask)})
    .catch((err)=> alert(err.message));
}
export const ChangeCheckBox=(taskId,editedTask)=>(dispatch)=>{
    fetch('http://localhost:8000/tasks/'+taskId,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(editedTask)
    })
    .then((res)=>{
        if(res.ok){
            return res.json();
        }
        else{
            var err = new Error("Error on updating "+res.status+": "+res.statusText);
            throw err;
        }
    },err =>{
        var errmess = new Error(err.message);
        throw errmess;
    })
    .then((res)=>{
        console.log("Action creators checkbox ",res)
    })
    .catch((err)=> alert(err.message));
}

export const DeleteAllTask=()=>(dispatch)=>{
    fetch('http://localhost:8000/tasks/',{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>{
        if(response.ok){
            return response
        }
        else{
            var err = Error("Error on deletion "+response.status+": "+response.statusText);
            throw err;
        }
    },err=>{
        var errmes = Error(err.message);
        throw errmes;
    })
    .then((res)=>{
        
        console.log("successfully deleted");
    })
    .catch((err)=> alert(err.message));
    
}

export const TaskLoading =() =>({
    type: ActionTypes.TASK_LOADING
});
export const TaskFailed=(errMess)=>({
    type: ActionTypes.TASK_FAILED,
    payload: errMess
})
export const AddTask=(tasks)=>({
    type: ActionTypes.ADD_TASK,
    payload: tasks
});
