import {projectHandler,taskHandler} from "./objects";
import {dom} from "./user-interface";
import {myStorage ,initializeUiFromStorage} from "./storage";




initializeUiFromStorage.initUiFromStorage();


let size = localStorage.length;
        
       
for (var i = 0; i < size; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
        
    }   


//myStorage.saveFlag("defualtFlag",true);


//TODO finish input of porject area, add logic of add button
//add the newly created objects in myStorage and ui



//TODO create demo tasks in html and css 
//TODO create demo tasks using js
//TODO create the tasks from the information in project obj taken from myStorage
//create a way to add delete tasks






// TODO start implamenting the dom and task stuff

