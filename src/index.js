import {projectHandler,taskHandler} from "./objects";
import {dom} from "./user-interface";
import {myStorage ,initializeUiFromStorage} from "./storage";




initializeUiFromStorage.initUiFromStorage();

let array = [1,2,3,4,5,6];
let size = array.length;
let temp = array.slice(0,size);
console.log(temp);


//myStorage.saveFlag("defualtFlag",true);


//TODO finish input of porject area, add logic of add button
//add the newly created objects in myStorage and ui



//TODO create demo tasks in html and css 
//TODO create demo tasks using js
//TODO create the tasks from the information in project obj taken from myStorage
//create a way to add delete tasks






// TODO start implamenting the dom and task stuff

