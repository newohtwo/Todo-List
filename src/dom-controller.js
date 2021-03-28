//this controllers goal is to manipulate the dom , add ,update,delete elements
import elementCreator from "./element-creator";
export default (function domController() {

    const menuIcon = _menuIconInit();
    const sideBar = _sideBarInit();

    //initialize menu icon
    function _menuIconInit(){
      let tempMenu = document.querySelector(".menu-icon"); 
      tempMenu.onclick = function(){
        _toggleSideBar();
      }
      return tempMenu;
    }

    //initialize sidebar
    function _sideBarInit(){
        let tempSideBar = document.querySelector("#sidebar");
        return tempSideBar;
    }
    
    //toggle between display none and block
    function _toggleSideBar(){
        sideBar.classList[0] ==="side-bar" ? sideBar.classList = "display-none" : sideBar.classList = "side-bar";
    }

    function _addOnClick(){

    }

    
        
        
    



    return{
        
    }

})();



