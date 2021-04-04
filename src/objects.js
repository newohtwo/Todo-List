//factory function for todotasks
import {myStorage} from "./storage";
import { elementCreator } from "./user-interface";
const _toDoTaskFactory = (title,desc,date,prio = 1) =>{

    //getters setters
    return{
      
      getTitle(){
        return title;
      },
      getDesc(){
        return desc;
      },
      getDate(){
        return date;
      },
      getPrio(){
        return prio;
      },
      setTitle(newTitle){
        title = newTitle;
      },
      setDesc(newDesc){
        desc = newDesc;
      },
      setDate(newDate){
        date = newDate;
      },
      setPrio(newPrio){
         prio = newPrio;
      }
      
    }
}

//handle project update delete and add
const _projectFactory = (title,toDoArr =[]) =>{


    return{
        getTitle(){
          return title;
        },
        getTaskArr(){
          return toDoArr;
        },
        setTitle(newTitle){
          title = newTitle;
        },
        
    }

};


//to export only the behavior and not the constructors



//handle all the needed actions on a project
const projectHandler = (() =>{

    function newProject(title ,arr){
      if(arr === undefined){
        //create a new project with empty arr and save it to mystorage for ui
      }
      return _projectFactory(title , arr);
    }

    

    function addTask(project,task){
        project.getTaskArr().push(task);
    }

    function deleteTask(project,title){

        let size = project.toDoArr.length;
        let tempArr = project.toDoArr.slice(0,size);
        let index = tempArr.indexOf(title);
        tempArr.splice(index,1);

        project.toDoArr = tempArr;

    }

    /*
    function defualtProjectData(){
     return defualtData.defualtProject();
    }
    */

    

    return{
        newProject,
        addTask:addTask,
        deleteTask,
       // defualtProjectData, maybe wont be needed ! ! ! ! ! ! ! ! ! ! ! ! 

    }

})();

const taskHandler = (() =>{
    function newTask(title,desc,date,prio){
        return _toDoTaskFactory(title,desc,date,prio);
    }

    

    return{
        newTask,
      
        
    }
})();


//create defualt data of project and task
const defualtData = (()=>{

  
  function _saveDefualtProject(){
    myStorage.saveProject(_createProject());
  }
  //initialize the defualt project that will apear on the start of the website, need to make sure that it dosent start after deleteion hence why there is 2 flags
  //make sure it works that it appears once and if deleted dosent apear




  //initalize defualt project, save it to storage, if was deleted wont show it again
  (function initDefualtProject(){

    let defualtKey = myStorage.getFlag("defualtFlag");
    let defaultProject = myStorage.getProject("defualt");

    _checkExistence(defualtKey , defaultProject);


  })();

  //check the existence of the project, create or retrive from local
  function _checkExistence(defualtKey , defaultProject){

    if(defaultProject === undefined &&  (defualtKey === true || defualtKey === undefined || defualtKey === null)){
      console.log("in init of defualt project");
      _saveDefualtProject();
      myStorage.saveFlag("defualtFlag" , true); 
    }else if(defualtKey){
      //if there is show it on the ui 

      elementCreator.projectToElment(defaultProject);
      
    }

  }

  
  //create a new project and add defualt task
  function _createProject(){
    let emptyArray = [];
    let defualtPrj = projectHandler.newProject("defualt" ,emptyArray);
    projectHandler.addTask(defualtPrj , _createTask());
     return defualtPrj;
   }

  function _createTask (){
    return taskHandler.newTask("defualt","this is a defualt task" , "31/3/2021" , 5);
  }

  return{
    defualtProject: _saveDefualtProject,
  }

})();

 export {projectHandler,taskHandler};




