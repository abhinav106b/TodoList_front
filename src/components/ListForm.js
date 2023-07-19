import React,{useState,useEffect} from "react";
import {Button, Dropdown,DropdownItem,DropdownMenu,DropdownToggle,Modal,ModalBody,ModalHeader,
Form,FormGroup,Label,Input,ModalFooter} from 'reactstrap'
import {v4 as uuid} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import {FetchTasks,PostTask,DeleteTask,EditTask,ChangeCheckBox,DeleteAllTask} from '../redux/ActionCreators'
import {connect} from 'react-redux'



const mapStateToProps = state =>{
    return {
        tasks_redux: state.tasks
    }
}
const mapDispatchToProps = (dispatch) =>({
    FetchTasks: ()=>{dispatch(FetchTasks())},
    PostTask: (task) =>{dispatch(PostTask(task))},
    DeleteTask: (taskId)=>{dispatch(DeleteTask(taskId))},
    EditTask: (taskId,task)=>{dispatch(EditTask(taskId,task))},
    ChangeCheckBox: (id,editedTask) => dispatch(ChangeCheckBox(id,editedTask)),
    DeleteAllTask:() => dispatch(DeleteAllTask())
})

function TodoList(props){
    const[toggleDropdown,setToggleDropdown] = useState(false);
    const[dropData,setDropData] = useState("All");
    const[isModalOpen,setIsModalOpen] = useState(false);
    const[tasks,setTasks]= useState([]);
    const[clearBool,setClearBool] = useState(false);
    const[filterTasks,setFilterTasks] = useState([]);
    const[editModal,setEditModal] = useState(false);
    const[currentId,setCurrentId] = useState("");

    useEffect(()=>{
        props.FetchTasks();
        setTasks(props.tasks_redux.tasks);
        setFilterTasks(props.tasks_redux.tasks);
        dummyFunction();
        
        /*
        let todolist = window.localStorage.getItem("todoList");
        if(todolist){
            todolist = JSON.parse(todolist);
            setTasks(todoList);
            setFilterTasks(todolist);
        }
        else{
            window.localStorage.setItem("todoList",[]);
            setTasks([]);
        }
        */
    },[])
    const dummyFunction =()=>{
        console.log("Dummy function props "+props.tasks_redux.tasks);
    }
    useEffect(()=>{
        console.log("filter function from temptasks ",tasks)
        filterFunction(dropData);
    },[tasks])

    useEffect(()=>{
        setTasks(props.tasks_redux.tasks);
        setFilterTasks(props.tasks_redux.tasks);
        console.log("Successfully updates tasks ",props.tasks_redux.tasks)
    },[props.tasks_redux.tasks])

    const toggleDrop=()=>{
        setToggleDropdown(!toggleDropdown);
    }
    const filterFunction=(e)=>{ 
        let tempFilter =[];
        if(e === "Completed"){
            tasks.forEach(element => {
                if(element.status){
                    tempFilter.push(element);
                }
            });
        }
        else if(e === "Incomplete"){
            tasks.forEach(element=>{
                if(!element.status){
                    tempFilter.push(element);
                }
            })
        }
        else{
            tempFilter = tasks;
        }
        setFilterTasks(tempFilter);
    }
    const onDropClick=(e)=>{
        setDropData(e.target.id);
        filterFunction(e.target.id);
    }
    const onModalClick=()=>{
        setIsModalOpen(!isModalOpen)
    }
    const onEditModalClick =()=>{
        setEditModal(!editModal);
    }
    const onFormSubmit=(e)=>{
        onModalClick();
        let titleData = document.getElementById("title");
        let statusData = document.getElementById("status");
        const date= new Date();
        let datenow = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        let statusbool = false;
        if(statusData.value === "Completed"){
            statusbool = true
        }
        let data={
            id: uuid(),
            title: titleData.value,
            status: statusbool,
            dateData: datenow
        }
        tasks.push(data);
        props.PostTask(data);
        /*
        tasks.push(data);
        filterFunction(dropData);
        window.localStorage.setItem("todoList",JSON.stringify(tasks));
        */
        e.preventDefault();
    }
    const changeCheckbox=(id)=>{ 
        var editedstatus;
        var title;
        var datenow;
        let tempTasks = tasks;
        tempTasks.forEach((element)=>{
            if(element.id === id){
                title= element.title;
                datenow= element.dateData;
                if(element.status){
                    element.status = false;
                    editedstatus = false;
                }
                else{
                    element.status = true;
                    editedstatus = true;
                }
            }
        })
        setTasks([...tempTasks]);
        let editedTask={
            title: title,
            status: editedstatus,
            dateData: datenow
        }
        props.ChangeCheckBox(id,editedTask);

        /* let tempData = window.localStorage.getItem("todoList");
        tempData = JSON.parse(tempData);
        for(let i=0;i<tempData.length;i++){
            if(tempData[i].id===id){
                if(tempData[i].status){
                    tempData[i].status= false;
                    
                }
                else{
                    tempData[i].status = true;
                    
                }
                break;
            }
        }
        setTasks(tempData);
        window.localStorage.setItem("todoList",JSON.stringify(tempData)); */

    }
    const clearList=()=>{
        toggleClear();
        setTasks([]);
        props.DeleteAllTask();
        /*
        window.localStorage.removeItem('todoList');
        toast("Deleted successfully");
        */
    }
    const toggleClear=()=>{
        setClearBool(!clearBool);
    }

    const deleteList=(id)=>{
        let temp = tasks;
        let ind;
        temp.forEach((element,index)=>{
            if(element.id === id){
                ind= index;
            }
        })
        temp.splice(ind,1);
        setTasks([...temp])
        props.DeleteTask(id);
        /*
        let temp = window.localStorage.getItem('todoList');
        if(temp){
            temp = JSON.parse(temp);
            temp.forEach((element,index) =>{
                if(element.id === id){
                    temp.splice(index,1);
                }
            });
            setTasks(temp);
            window.localStorage.setItem('todoList',JSON.stringify(temp));
        }
        */
    }

    const updateList=(id,e)=>{
        onEditModalClick();
        let titledata = document.getElementById('titleedit');
        let statusdata = document.getElementById('statusedit');
        const date= new Date();
        let datenow = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
        let statusbool = false;
        if(statusdata.value === "Completed"){
            statusbool = true
        }
        let tempTasks = tasks;
        tempTasks.forEach((element)=>{
            if(element.id === id){
                element.title = titledata.value;
                element.status = statusbool;
                element.dateData = datenow;
            }
        })
        let data={
            title: titledata.value,
            status: statusbool,
            dateData: datenow
        }
        setTasks([...tempTasks]);
        props.EditTask(id,data);
        /*
        let todoArr = window.localStorage.getItem('todoList');
        if(todoArr){
            todoArr = JSON.parse(todoArr);
            todoArr.forEach((element,index)=>{
                if(element.id === id){
                    element.title = titledata.value;
                    element.status = statusbool;
                    element.dateData = datenow;
                }
            })
            setTasks(todoArr);
            window.localStorage.setItem('todoList',JSON.stringify(todoArr));
        }
        */
        e.preventDefault();
    } 

    const setId =(id)=>{
        setCurrentId(id);
        onEditModalClick();
    }

    return(
        <div className="container">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />

            {/* Modal for clear List */}
            <Modal toggle={toggleClear} isOpen={clearBool}>
                <ModalHeader toggle={toggleClear}>Are you sure want to clear the list</ModalHeader>
                <ModalFooter>
                    <Button onClick={toggleClear} color="primary">Cancel</Button>
                    <Button onClick={()=>clearList()} color="danger">Yes</Button>
                </ModalFooter>
            </Modal>

            {console.log("Check inside the jsx ",props.tasks_redux.tasks)}

            {/* Modal for Adding List */}
            <Modal toggle={onModalClick} isOpen={isModalOpen}>
                <ModalHeader toggle={onModalClick}>Task</ModalHeader>
                <Form onSubmit={(e)=>onFormSubmit(e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" type="text" name="title" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Input id="status" name="status" type="select">
                                <option>Incomplete</option>
                                <option>Completed</option>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" className="fl-right">Add</Button>
                        <Button onClick={()=>onModalClick()} color="dark" className="fl-left">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>

            {/* Modal for editing List */}
            <Modal isOpen={editModal} toggle={onEditModalClick}>
                <ModalHeader toggle={onEditModalClick}>Edit the lsit</ModalHeader>
                <Form onSubmit={(e)=>updateList(currentId,e)}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="titleedit">Title</Label>
                            <Input id="titleedit" type="text" name="titleedit" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <Input id="statusedit" name="statusedit" type="select">
                                <option>Incomplete</option>
                                <option>Completed</option>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" className="fl-right">Edit</Button>
                        <Button onClick={()=>onEditModalClick()} color="dark" className="fl-left">Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>

            <p className="head-txt">TodoList</p>
            
            <div  className="tasks-bg">
            <div className="row">
                <div className="list-box">
                    <Button onClick={()=>setIsModalOpen(!isModalOpen)} color="success" className="fl-right">ADD TASK  <span className="fa fa-plus"></span></Button>
                    <Button onClick={()=>toggleClear()} className="fl-right clear-btn" color="danger">Clear</Button>
                    <div className="fl-left">
                        <Dropdown isOpen={toggleDropdown} toggle={toggleDrop}>
                            <DropdownToggle color="dark" caret>{dropData}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={(e)=>onDropClick(e)} id="All">All</DropdownItem>
                                <DropdownItem onClick={(e)=>onDropClick(e)} id="Completed">Completed</DropdownItem>
                                <DropdownItem onClick={(e)=>onDropClick(e)} id="Incomplete">Incomplete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {tasks.length === 0 ? <div></div> : <div>
                {filterTasks.map((data,index)=>{
                return(
                    <div key={index} className="task-box">
                        <div className="row">
                            <div className="col-1"><Input onChange={()=>changeCheckbox(data.id)} className="checkbox-siz" checked={data.status} type="checkbox" id="statuscheck" /></div>
                            <div className="col-8">
                                <span className="fnt-head">{data.title}</span><br/>
                                <span className="datenow">{data.dateData}</span>
                            </div>
                            <div className="col-3">
                                <Button onClick={()=>deleteList(data.id)} size="lg" className="btn-delete"><span className="fa fa-trash"></span></Button>
                                <Button onClick={()=>setId(data.id)} size="lg" className="btn-edit"><span className="fa fa-pencil"></span></Button>
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
            }
            </div>
        </div>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);