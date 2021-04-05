
import {myStorage} from "./storage";
import {projectHandler} from "./objects";

//add elements with thier behaviour
const elementCreator = (() =>{
    //get project from my Storage and transfer it to dom

    function addToSideBar(element){
        dom.addElementToSideBar(element);
    }

    function projectToElment(project){
        let tempP = project;
        let element = document.createElement("div");
        element.className = "project";

        let text = document.createElement("p");
        text.textContent = tempP.getTitle();

        let xSign = document.createElement("span");
        xSign.textContent = "x";


        xSign.onclick = function(){
            //delete the project 
            //delte from myStorage and change the flag 
            //delete from the ui
            //delet all the associates tasks with the project

            let projectName = tempP.getTitle();
            alert("project " + projectName);
            
            dom.deleteElementFromSideBar(element);
            myStorage.deleteProject(projectName);

        }


        element.appendChild(text);
        element.appendChild(xSign);

        addToSideBar(element);

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




    return{
        projectToElment,

        _initAddBtn,
        _initCancelBtn,
        _initForm,
        _initMenuItem,
        _initProjectBtn,
        _initSideBar,
        _initNewProjectForm,
        errorAlret,

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
    
    //will make popup show and than enter some data into it, will have add and cancel buttons
    function newProjectPopUp(){

    }

    function addElementToSideBar(projectElment){
        //get project and break it into pieces from domHelper  
        sidebar.insertBefore(projectElment , addProjectBtn);

    }

    //will need to also delete all the elements from the tasksbar
    function deleteElementFromSideBar(element){
        sidebar.removeChild(element);
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



    return{
       addElementToSideBar,
       deleteElementFromSideBar,
       getSideBar,
       getPopUpForm,
       getProjectBtn,
       getInputForm,
       
       
    }

})();








export{dom , elementCreator};