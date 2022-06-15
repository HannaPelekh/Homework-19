class TodoController {    
    #container$ = null;    
    #view = null;
    #model = null;
    #todos = [];
    constructor (el){
        this.#container$ = el;        
        this.#view = new TodoView(
            this.#container$, {
            onCreate: this.onTodoCreate,
            onComplete: this.onTodoComplete,
            onDelete: this.onTodoDelete,
            onEdit:  this.onTodoEdit,
            });
        this.#model = new TodoModel("todos/");
        this.#model.getAllTodos().then((r) => {
            this.#view.renderTodos(r);                                 
        });                                    
    }
    onTodoCreate = (todo) => {              
       return this.#model.crateTodo(todo).then((r) => this.#view.createSingleTodo(r));             
    }
    onTodoComplete = (todo, id) => { 
        return this.#model.completeTodo(todo, id);        
     }
    onTodoDelete = (id) => {         
    return this.#model.deleteTodo(id);        
    }
    onTodoEdit = (todo, id) => {                            
        return this.#model.editeTodo(todo, id); 
    }
}

           