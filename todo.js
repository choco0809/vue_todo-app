const { createApp } = Vue
const STORAGE_KEY_INCOMPLETE = 'my-todo_incomplete'
const STORAGE_KEY_COMPLETE = 'my-todo_complete'

const app = createApp({
  data() {
    return {
      inputTodo: '',
      incompleteToDoList:[],
      completeToDoList:[]
    }
  },
  methods: {
    addNewTodo: function () {
      this.incompleteToDoList.push({contents: this.inputTodo, checked: false, editChecked: true})
      this.saveTodoForLocalStorage(STORAGE_KEY_INCOMPLETE,this.incompleteToDoList)
      this.inputTodo = ''
    },
    editTodoContent: function (index, contents){
      this.incompleteToDoList[index].contents = contents
      this.incompleteToDoList[index].editChecked = true
      this.saveTodoForLocalStorage(STORAGE_KEY_INCOMPLETE,this.incompleteToDoList)
    },
    updateIncompleteToDoList: function (index) {
      const completeItem = this.incompleteToDoList.splice(index,1)
      this.completeToDoList.push(completeItem[0])
      this.saveTodoForLocalStorage(STORAGE_KEY_INCOMPLETE,this.incompleteToDoList)
      this.saveTodoForLocalStorage(STORAGE_KEY_COMPLETE,this.completeToDoList)
    },
    updateCompleteToDoList: function (index){
      const incompleteItem = this.completeToDoList.splice(index,1)
      this.incompleteToDoList.push(incompleteItem[0])
      this.saveTodoForLocalStorage(STORAGE_KEY_INCOMPLETE,this.incompleteToDoList)
      this.saveTodoForLocalStorage(STORAGE_KEY_COMPLETE,this.completeToDoList)
    },
    deleteInCompleteToDoList: function (index){
      this.incompleteToDoList.splice(index,1)
      this.saveTodoForLocalStorage(STORAGE_KEY_INCOMPLETE,this.incompleteToDoList)
    },
    deleteCompleteToDoList: function (index){
      this.completeToDoList.splice(index,1)
      this.saveTodoForLocalStorage(STORAGE_KEY_COMPLETE,this.completeToDoList)
    },
    saveTodoForLocalStorage: function (storage_key, object) {
      localStorage.setItem(storage_key, JSON.stringify(object))
    },
    fetchTodoForLocalStorage: function (storage_key) {
      return JSON.parse(localStorage.getItem(storage_key)) ?? []
    }
  },
  mounted: function () {
    this.incompleteToDoList = this.fetchTodoForLocalStorage(STORAGE_KEY_INCOMPLETE)
    this.completeToDoList = this.fetchTodoForLocalStorage(STORAGE_KEY_COMPLETE)
  }
})

app.mount('#app')
