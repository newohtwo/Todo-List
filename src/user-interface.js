
import {myStorage} from "./storage";
import {projectHandler,taskHandler} from "./objects";


//TODO project and task are not saved check 

//add elements with thier behaviour
const elementCreator = (() =>{
    let currentProjectTitle = "";
    //get project from my Storage and transfer it to dom
    function addToSideBar(element){
        dom.addElementToSideBar(element);
    }

    //shows the current project in use
    function subTitleOfCurrentProject(title){
        dom.getCurrentProjectName().textContent = "project: " + title;
        currentProjectTitle = title;
    }

    //converts task to an element
    function taskToElement(task){

        dom.addTaskToGridContainer(_convertTaskToDiv(task));

    }

    
    function _convertTaskToDiv(task){
        let div = document.createElement("div");
        div.classList = "task";

        let pTitle = document.createElement("p");
        pTitle.classList = "task-text";
        pTitle.textContent = task.getTitle();

        let pDate = document.createElement("p");
        pDate.classList = "task-date";
        pDate.textContent = task.getDate();

        let xSign = document.createElement("span");
        xSign.onclick = function(){
            _deleteTaskHelper(currentProjectTitle,task.getTitle(),div);
        }
        xSign.textContent = "X";

        div.appendChild(pTitle);
        div.appendChild(pDate);
        div.appendChild(xSign);
        return div;
    }



    function _deleteTaskHelper(pTitle,title,div){
        myStorage.deleteTaskFromProject(pTitle,title);
        dom.deleteTaskFromGridContainer(div);
    }


    function projectToElment(project){
        let tempP = project;
        let element = document.createElement("div");
        element.className = "project";

        let text = document.createElement("p");
        text.textContent = tempP.getTitle();

        let xSign = document.createElement("span");
        xSign.textContent = "x";
        //the project
        element.onclick = function(){
            //from a click on this , get the title of the project and its tasks into a function
            //get all the tasks and convert t hem into elements
            //delete all the other elements on the screen regarding tasks
            //change the name of h2
            // upload tasks to screen
            
            if(currentProjectTitle === tempP.getTitle()){
                console.log("user press on same project do nothing");
                return;
            }

            dom.deleteAllElementsFromGrid();
            subTitleOfCurrentProject(tempP.getTitle());
            _tasksToElements(tempP.getTaskArr());
            
            
           
        }
        //x of the project
        xSign.onclick = function(){
            //delete the project 
            //delte from myStorage and change the flag 
            //delete from the ui
            //delet all the associates tasks with the project

            let projectName = tempP.getTitle();
            alert("project " + projectName);
            
            dom.deleteElementFromSideBar(element);
            myStorage.deleteProject(projectName);
            dom.deleteAllElementsFromGrid();
          

        }

        element.appendChild(text);
        element.appendChild(xSign);

        addToSideBar(element);

    }

    //convert all the tasks in a project to elements
    function _tasksToElements(taskArray){
        let arr = taskArray;
        let size = arr.length;
        for (let index = 0; index < size; index++) {
            taskToElement(arr[index]);
            console.log(index);
        }
    }


    //initalize the sidebar var
    function _initSideBar(){
        let element = document.querySelector("#sidebar");
        return element;
    }



     //toggle between block and none sidebar
     function _toggleSideBar(sideBar){
        sideBar.classList[0] === "side-bar" ? sideBar.classList = "display-none" : sideBar.classList = "side-bar";
    }

    //toggle the newproject button
   function _toggleProjectBtn(btn){
       
        if(btn.style.visibility === "hidden"){
            btn.style.visibility = "visible";
        }else{
            btn.style.visibility = "hidden"
        }
   }

   //toggle the form with the buttons
    function _togglePopForm(form){
        
        form.classList[0] === "display-none" ? form.classList = "add-cancel-project-container" : form.classList = "display-none";
       
    }
    

    //init menu item var
    function _initMenuItem(){
        let element = document.querySelector(".menu-icon");
        element.onclick = function(){
            
            _toggleSideBar(dom.getSideBar());
        }
        return element;
    }


    //looks and behaviour of the new project button
    function _initProjectBtn(){
        let element = document.querySelector("#add-project-btn");
        element.onclick = function(){
            _toggleProjectBtn(element);
            _togglePopForm(dom.getPopUpForm());
            
        }
        return element;
    }
    //add-cancel-project-container

    function _initNewProjectForm(){
        let element = document.querySelector("#popup-form");
        return element;
    }

    //takes input from form and sends it to projecthandler
    function _initAddBtn (){
        let element = document.querySelector("#add-btn");
        element.onclick = function(){
            //add here the logic for creating new projects
            let inputForm = dom.getInputForm();
            if(inputForm.value === ""){
                alert("name cannot be empty");
                return;
            }
            projectHandler.newProject(inputForm.value);
            inputForm.value = "";



        }
        return element;
    }

    function _initCancelBtn(){
        let element = document.querySelector("#cancel-btn");
        element.onclick = function(){
            _toggleProjectBtn(dom.getProjectBtn());
            _togglePopForm(dom.getPopUpForm());
            dom.getInputForm().value = "";
        }
        return element;
    }

    function  _initForm() {
        let element = document.querySelector("#new-project-name");
        return element;
    }

    function errorAlret(message){
        alert(message);
    }


    function _initPlusIcon(){
        let element = document.querySelector("#plus-icon");
        element.onclick = function(){
            dom.getModal().style.display = "block";
        }
        
        return element;
    }

     function _initModalCancelBtn(){
        let element = document.querySelector("#modal-cancel-btn");
        
        element.onclick = function(){
            dom.getModal().style.display = "none";
            dom.clearFormValues();

        }
        return element;
        
     }

     function _initModalAddBtn(){
        let element = document.querySelector("#modal-add-btn");
       
        element.onclick = function(){
           

            _taskCreatorHelper();
  
        }
        return element;
        
    }

    //gets data from forms and creates a new task, saves task to project and shows on screen the new element
    function _taskCreatorHelper(){
        let title = dom.getModalTaskForm().value;
        let date = dom.getModalTaskDate().value;

        if(date !== ""){
        date = date.split("-").reverse().join("-");
        }else{
            date = "date not given";
        }

        let task = taskHandler.newTask(title,"",date);

        myStorage.addTaskToProject(currentProjectTitle,task);
        elementCreator.tasksToElement(task);

        dom.clearFormValues();
    }




    return{
        projectToElment,

        _initAddBtn,
        _initCancelBtn,
        _initForm,
        _initMenuItem,
        _initProjectBtn,
        _initSideBar,
        _initNewProjectForm,
         _initPlusIcon,
        errorAlret,
        _initModalAddBtn,
        _initModalCancelBtn,
        tasksToElement: taskToElement,
        subTitleOfCurrentProject,




    }


})();



const dom = (() => {
    const sidebar = elementCreator._initSideBar();
    const menuIcon = elementCreator._initMenuItem();
    const addProjectBtn = elementCreator._initProjectBtn();
    const addBtn = elementCreator._initAddBtn();
    const cancelBtn = elementCreator._initCancelBtn();
    const projectTextForm = elementCreator._initForm();
    const popupForm = elementCreator._initNewProjectForm();
    const formInput = document.querySelector("#new-project-name");
    const plusIcon = elementCreator._initPlusIcon();

    const main = document.querySelector(".main");
    const gridContainer = document.querySelector("#grid-container");
    const currentProjectTitle = document.querySelector("#project-name");

    const modal = document.querySelector("#myModal");
    const modalAddBtn = elementCreator._initModalAddBtn();
    const modalCancelBtn = elementCreator._initModalCancelBtn();
    const modalTaskForm = document.querySelector("#modal-task-name");
    const modalTaskDate = document.querySelector("#modal-task-date");
    

    //will make popup show and than enter some data into it, will have add and cancel buttons
    function newProjectPopUp(){

    }

    function addTaskToGridContainer(task){
        gridContainer.appendChild(task);
    }
    function deleteTaskFromGridContainer(task){
        gridContainer.removeChild(task);
    }
   

    function addElementToSideBar(projectElment){
        //get project and break it into pieces from domHelper  
        sidebar.insertBefore(projectElment , addProjectBtn);

    }

    //will need to also delete all the elements from the tasksbar
    function deleteElementFromSideBar(element){
        sidebar.removeChild(element);
    }


    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      } 

    function clearFormValues(){
        modalTaskForm.value = "";
        modalTaskDate.value = "";
    }   
    

    function deleteAllElementsFromGrid(){
        while (gridContainer.lastElementChild) {
            gridContainer.removeChild(gridContainer.lastElementChild);
          }
    }
   

    function getSideBar(){
        return sidebar;
    }
    function getPopUpForm(){
        return popupForm;
    }
    function getProjectBtn(){
        return addProjectBtn;
    }
    function getInputForm(){
        return formInput;
    }
    function getPlusSign(){
        return plusIcon;
    }
    function getModal(){
        return modal;
    }
    function getModalTaskForm(){
        return modalTaskForm;
    }
    function getModalTaskDate(){
        return modalTaskDate;
    }
    function getCurrentProjectName(){
        return currentProjectTitle;
    }




    return{
       addElementToSideBar,
       deleteElementFromSideBar,
       getSideBar,
       getPopUpForm,
       getProjectBtn,
       getInputForm,
       getPlusSign,
       getModal,
       getModalTaskForm,
       getModalTaskDate,
       addTaskToGridContainer,
       getCurrentProjectName,
       clearFormValues,
       deleteTaskFromGridContainer,
       deleteAllElementsFromGrid,
       
       



       
       
    }

})();








export{dom , elementCreator};