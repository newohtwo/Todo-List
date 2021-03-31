import elementCreator from "./element-creator";
import componentsHandler from "./components-handler";


//this moudle creates the logic of the components in the web
export default (function componentsLogic() {
    
    function _projectBtn(element,sideBar){
        element.onclick = function (){
            _toggleSideBar(sideBar);
        }
        return element;
    }

    function _toggleSideBar(sideBar){
        sideBar.classList[0] ==="side-bar" ? sideBar.classList = "display-none" : sideBar.classList = "side-bar";
    }
   

return{
    projectBtnLogic:_projectBtn,
}


})();