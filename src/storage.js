import { taskHandler, projectHandler } from './objects'
import { elementCreator } from './user-interface'

// converts data from defualt to custom objects and vise versa
const convertHelper = (() => {
  // convert a project and its tasks into regular objects
  function projectToObject (project) {
    const tempP = project
    const tmpTaskArr = tempP.getTaskArr()
    const size = tmpTaskArr.length

    for (let i = 0; i < size; i++) {
      tmpTaskArr[i] = _taskToObj(tmpTaskArr[i])
    }

    const newP = {
      title: project.getTitle(),
      toDoArr: tmpTaskArr
    }

    return newP
  }
  // convert task to obj
  function _taskToObj (task) {
    const obj = {
      title: '',
      desc: '',
      date: '',
      prio: ''
    }

    obj.title = task.getTitle()
    obj.desc = task.getDesc()
    obj.date = task.getDate()
    obj.prio = task.getPrio()
    return obj
  }

  // convert object into private project
  function objectToProject (object) {
    if (object === null) {
      console.log('object empty')
      return undefined
    }

    const tempO = object

    const size = tempO.toDoArr.length
    let tempArr = []

    if (size > 0) {
      tempArr = tempO.toDoArr
      for (let i = 0; i < size; i++) {
        tempArr[i] = _objToTask(tempArr[i]);
      }
    }

    return projectHandler.newProject(tempO.title, tempO.toDoArr)
  }
  // create a new task from obj
  function _objToTask (obj) {
    return taskHandler.newTask(obj.title, obj.desc, obj.date, obj.prio)
  }

  return {
    projectToObject,
    objectToProject
  }
})()



// saves and gets data from localstorage
const myStorage = (() => {
  // save project after convertion into object in localstorage
  function saveProject (project) {
    const tempP = project
    console.log('in save project')
    console.log(tempP.getTaskArr())
    localStorage.setItem(tempP.getTitle(), JSON.stringify(convertHelper.projectToObject(tempP)))
  }

  // retrive object from local storage and convert it to project
  function getProject (title) {
    const temp = convertHelper.objectToProject(JSON.parse(localStorage.getItem(title)))

    return temp
  }

  function saveFlag (flagName, value) {
    localStorage.setItem(flagName, value)
  }

  // convert flag into boolean
  function getFlag (flagName) {
    return JSON.parse(localStorage.getItem(flagName))
  }

  function deleteProject (title) {
    if (title === 'defualt') {
      _deleteDefualt()
      return
    }

    localStorage.removeItem(title)
  }

  function _deleteDefualt () {
    myStorage.saveFlag('defualtFlag', true)
    localStorage.removeItem('defualt')
  }

  // add new task to project and save project
  function addTaskToProject (pName, task) {
    const project = getProject(pName)

    projectHandler.addTask(project, task)

    saveProject(project)
    console.log('in add task to project')
    console.log(project.getTaskArr())
  }

  function deleteTaskFromProject (pName, title) {
    const project = getProject(pName)
    projectHandler.deleteTask(project, title)
    saveProject(project)
  }

  return {
    saveProject,
    getProject,
    saveFlag,
    getFlag,
    deleteProject,
    addTaskToProject,
    deleteTaskFromProject

  }
})()

// NEED TO WORK ON THIS PART TO FIGURE OUT HOW TO INIT PROJECT AND TASKS FROM HERE

const initializeUiFromStorage = (() => {
  // well i call it from index , do the other stuff
  function initUiFromStorage () {
    const size = localStorage.length
    let doOnce = true
    // let test = require("./objects").projectHandler;

    for (let i = 0; i < size; i++) {
      const temp = JSON.parse(localStorage.getItem(localStorage.key(i)))

      if (typeof temp === 'object' && temp.title !== 'defualt') {
        // need to get the projects and initialize the tasks from here

        const project = convertHelper.objectToProject(temp)
        elementCreator.projectToElment(project)

        if (doOnce) {
          // convert only one of the projects tasks to show for the user
          const taskArray = project.getTaskArr()
          const size = taskArray.length
          for (let index = 0; index < size; index++) {
            elementCreator.tasksToElement(taskArray[index])
          }
          elementCreator.subTitleOfCurrentProject(project.getTitle())
          doOnce = false
        }

        // choose the first project encounterd in the system and showcase that one
        // take the tasks from the project and add them into the grid seperatly do it once
        // evrey click on project will load the other tasks
      }
    }
  };

  return {
    initUiFromStorage
  }
})()

export { myStorage, initializeUiFromStorage }
