//this controllers goal is to manipulate the dom , add ,update,delete elements

const dom = (() => {
    const sidebar = initSideBar();
    const menuIcon = initMenuItem();
    
    //initalize the sidebar var
    function initSideBar(){
        let tempE = document.querySelector("#sidebar");
        return tempE;
    }
    
    //init menu item var
    function initMenuItem(){
        let tempE = document.querySelector(".menu-icon");
        tempE.onclick = function(){
            _toggleSideBar(sidebar);
        }
        return tempE;
    }

    //toggle between block and none sidebar
    function _toggleSideBar(sideBar){
        sideBar.classList[0] ==="side-bar" ? sideBar.classList = "display-none" : sideBar.classList = "side-bar";
    }

})();






export{dom};