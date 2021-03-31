import {projectHandler,taskHandler} from "./objects";
import {dom} from "./user-interface";
import {myStorage} from "./storage";






let task = taskHandler.newTask("first task","more" ,"adsf");
let task2 = taskHandler.newTask("second task");
let project = projectHandler.newProject("my project");

projectHandler.addTask(project,task);
projectHandler.addTask(project,task2);

console.log(project);
myStorage.saveProject(project);
let tempP = myStorage.getProject(project.getTitle());




// TODO start implamenting the dom and task stuff

