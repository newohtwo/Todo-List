//TODO create the local storage here and make a first save of a defualt project than get that save and place it in ui and in a variable 
import {projectHandler,taskHandler} from "./objects";
import {elementCreator} from "./user-interface";

//converts data from defualt to custom objects and vise versa
const convertHelper = (() =>{

    //convert a project and its tasks into regular objects
    function projectToObject(project){
        let tempP = project;
        let tmpTaskArr = tempP.getTaskArr();
        let size = tmpTaskArr.length;
        
        for(let i = 0 ; i < size; i++){
            tmpTaskArr[i] = _taskToObj(tmpTaskArr[i]);
        }

        let newP = {
            title: project.getTitle(),
            toDoArr: tmpTaskArr
        }

        return newP;
    }
    //convert task to obj
    function _taskToObj(task){

        let obj = {
            title:"",
            desc:"",
            date:"",
            prio:""
        }

        obj.title = task.getTitle();
        obj.desc = task.getDesc();
        obj.date = task.getDate();
        obj.prio = task.getPrio();
        return obj;


    }


    //convert object into private project
    function objectToProject(object){
        
        if(object === null){
            console.log("here");
            return undefined;
        }

        let tempO = object;
        let tempArr = tempO.toDoArr;
        let size = tempArr.length;

        for(let i = 0 ; i < size; i++){
            tempArr[i] = _objToTask(tempArr[i]);
        }

       return projectHandler.newProject(tempO.title,tempO.toDoArr);
    }
    //create a new task from obj
    function _objToTask(obj){
       return taskHandler.newTask(obj.title,obj.desc,obj.date,obj.prio);
    }

    return{
       projectToObject,
       objectToProject
    }

})();


//saves and gets data from localstorage
const myStorage = (() =>{

    //save project after convertion into object in localstorage
    function saveProject(project){
        let tempP = project;
        localStorage.setItem(tempP.getTitle(),JSON.stringify(convertHelper.projectToObject(tempP)));
    }

    //retrive object from local storage and convert it to project
    function getProject(title){
        let temp = convertHelper.objectToProject(JSON.parse(localStorage.getItem(title)));
        return temp;
    }

    function saveFlag(flagName , value){
        localStorage.setItem(flagName , value);
    }

    //convert flag into boolean
    function getFlag(flagName){

        let flag =localStorage.getItem(flagName);
        console.log("flag " + flag);
        if(flag === "true" || flag === null){
            return true;
        }
        return false;
    }

    function deleteProject(title){
        if(title ==="defualt"){
            _deleteDefualt();
            return;
        }

        localStorage.removeItem(title);
    }


    function _deleteDefualt(){
        myStorage.saveFlag("defualtFlag" , true);
        localStorage.removeItem("defualt");
    }

    (function initUiFromStorage(){
        let size = localStorage.length;
        for (var i = 0; i < size; i++){
            let temp =localStorage.getItem(localStorage.key(i));

                if(temp !== "true" && temp !== "false"){
                    //need to get the projects and initialize the tasks from here
                    console.log("from storage");
                    console.log(temp);
                }
        }
    })();


    return{
        saveProject,
        getProject,
        saveFlag,
        getFlag,
        deleteProject,
    }
})();


//NEED TO WORK ON THIS PART TO FIGURE OUT HOW TO INIT PROJECT AND TASKS FROM HERE
const initializeUiFromStorage =(() =>{

    (function initUiFromStorage(){
        let size = localStorage.length;
        let temp = "";
        console.log("in storage " + typeof temp + "  " + size);
        for (var i = 0; i < size; i++){
            temp = localStorage.key(i);
            console.log("in storage " + typeof temp);
            console.log(temp);
        }
    })();

    return {

    }

})();

export {myStorage};