// factory function for todotasks
import { myStorage } from './storage'
import { elementCreator } from './user-interface'

const _toDoTaskFactory = (title, desc = '', date, prio = 1) => {
  // getters setters
  return {

    getTitle () {
      return title
    },
    getDesc () {
      return desc
    },
    getDate () {
      return date
    },
    getPrio () {
      return prio
    },
    setTitle (newTitle) {
      title = newTitle
    },
    setDesc (newDesc) {
      desc = newDesc
    },
    setDate (newDate) {
      date = newDate
    },
    setPrio (newPrio) {
      prio = newPrio
    }

  }
}

// handle project update delete and add
const _projectFactory = (title, toDoArr = []) => {
  return {
    getTitle () {
      return title
    },
    getTaskArr () {
      return toDoArr
    },
    setTitle (newTitle) {
      title = newTitle
    },
    setTaskArr (array) {
      toDoArr = array
    }

  }
}

// to export only the behavior and not the constructors

// handle all the needed actions on a project
const projectHandler = (() => {
  function newProject (title, arr) {
    if (arr === undefined) {
      

      newProjectFromUi(title)
    }

    return _projectFactory(title, arr)
  }

  function newProjectFromUi (title) {
    // check existence
    if (checkForDuplicates(title)) {
      const project = _projectFactory(title)
      myStorage.saveProject(project)
      elementCreator.projectToElment(project)
    }
  }

  // check for duplicate names in project
  function checkForDuplicates (title) {
    if (localStorage.getItem(title) === null) {
      console.log('in true')
      return true
    }
    elementCreator.errorAlret('a project with this name already exists')
    return false
  }

  // tells project is undefined
  function addTask (project, task) {
    project.getTaskArr().push(task)
  }

  function deleteTask (project, title) {
    // something is wrong here

    const size = project.getTaskArr().length
    const tempArr = project.getTaskArr()

    for (let index = 0; index < size; index++) {
      if (tempArr[index].getTitle() === title) {
        tempArr.splice(index, 1)
        break
      }
    }

    project.setTaskArr(tempArr)
  }

  /*
    function defualtProjectData(){
     return defualtData.defualtProject();
    }
    */

  return {
    newProject,
    addTask,
    deleteTask
    // defualtProjectData, maybe wont be needed ! ! ! ! ! ! ! ! ! ! ! !

  }
})()

const taskHandler = (() => {
  function newTask (title, desc, date, prio) {
    return _toDoTaskFactory(title, desc, date, prio)
  }

  return {
    newTask

  }
})()

// create defualt data of project and task
const defualtData = (() => {
  function _saveDefualtProject () {
    myStorage.saveProject(_createProject())
  }
  
  // initalize defualt project, save it to storage, if was deleted wont show it again
  (function initDefualtProject () {
    const defualtKey = myStorage.getFlag('defualtFlag')
    const defaultProject = myStorage.getProject('defualt')

    _checkExistence(defualtKey, defaultProject)
  })()

  // check the existence of the project, create or retrive from local
  function _checkExistence (defualtKey, defaultProject) {
    if (defaultProject === undefined && (defualtKey === true || defualtKey === undefined)) {
      _saveDefualtProject()
      myStorage.saveFlag('defualtFlag', true)
    } else if (defualtKey) {
      // if there is show it on the ui

      elementCreator.projectToElment(defaultProject)
    }
  }

  // create a new project and add defualt task
  function _createProject () {
    const emptyArray = []
    const defualtPrj = projectHandler.newProject('defualt', emptyArray)
    projectHandler.addTask(defualtPrj, _createTask())
    return defualtPrj
  }

  function _createTask () {
    return taskHandler.newTask('defualt', 'this is a defualt task', '31/3/2021', 5)
  }

  return {
    defualtProject: _saveDefualtProject
  }
})()

export { projectHandler, taskHandler }
