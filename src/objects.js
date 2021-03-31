//factory function for todotasks
import {myStorage} from "./storage";
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

    function newProject(title ,arr =[]){
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

  //make this iffe function that will run with every webstart
  function defualtProject(){
    myStorage.saveProject(_createProject());


  }
  //initialize the defualt project that will apear on the start of the website, need to make sure that it dosent start after deleteion hence why there is 2 flags
  //make sure it works that it appears once and if deleted dosent apear
  function initDefualtProject(){
    if(myStorage.getProject("defualt") === undefined){
      defualtProject();
      myStorage.saveFlag("defualtFlag" , true);

      if(myStorage.getFlag("defualtDeleted") === undefined);{
        myStorage.saveFlag("defualtDeleted",false);
      }

    }else{
      //if there is show it on the ui 
    }
  }
  
  
  function _createProject(){
    let defualtPrj = projectHandler.newProject("defualt");
     defualtPrj.addTask(_createTask());
     return defualtPrj;
   }

  function _createTask (){
    return taskHandler.newTask("defualt","this is a defualt task" , "31/3/2021" , 5);
  }

  return{
    defualtProject,
  }

})();

 export {projectHandler,taskHandler};

/*
can make a moudle that will handle task updates or removes
can make a moudle that will handle project add update delete ect..
*/

//const swap = ([first, second]) => [second, first];
