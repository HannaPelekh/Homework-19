class TodoView {     
    #container$ = null;    
    #listContainer = null;    
    #options = null; 
    #todos = [];
    #current = {
        todo: null,
        el: null,
    };    
    #edit = {
        el: null,
        title: null,
        body: null,
    };
    static CLASSES = {        
        todo_complete: "todo_complete",        
        hideComplete_Btn: "hide_element",
        close: "close",
        complete: "complete_btn",
        active_item: "active_item",
        title: "title",
        body: "body"
    }    
    constructor (container, options){
        this.#container$ = container;          
        this.#options = options;                   
        this.init();            
    }    
    init() {
        this.initialRender(); 
        this.initialEditEl();                          
    }
    initialRender() {
        this.#container$.append(this.createInitialBlok())
        this.initListeners()
        
    }
    initListeners() {
       this.#listContainer = $(".todo_list").on("click", this.onTodoClick);
       $(".button_create").on("click", () => this.onTodoCreate()); 
       $(".save").on("click", () => this.onTodoSave()); 
       
    }   
    initialEditEl() {
        this.#edit.el = $(".edit_container");
        this.#edit.title = $(".edit_title");
        this.#edit.body = $(".edit_body");       
    } 
    
    onTodoCreate = () =>{
        const title = $("#input_title").val();
        const body = $("#input_body").val();
        this.#options.onCreate({title, body})            
    };
    renderTodos(todos) {
        this.#todos = todos;
        const html = todos.map(e => this.createTodoElement(e)).join("");
        this.#listContainer.html(html);     
           
    };
    createTodoElement(todo) {  
                         
        return      `<div class="todo_items ${todo.isComplete ? TodoView.CLASSES.todo_complete : ""
                        }" id="${todo.id}">
                        <div class="close"></div>
                        <h2 class="title">${todo.title}</h2>
                        <p class="body">${todo.body}</p>
                       <div class="dateAndComplete">
                            <p>${this.createDate(todo.createDate)}</p>
                            <p>${this.createTime(todo.createTime)}</p>
                            <button class="complete_btn ${
                                todo.isComplete ? TodoView.CLASSES.hideComplete_Btn : ""
                                }" id="${todo.id}">complete</button>
                        </div>
                    </div>`

    }   
    createDate(date){
        const newDate = moment(date).format("DD.MM.YYYY")        
        return newDate
    }
    createTime(time){
        const newTime = moment(time).format("HH:mm:ss")        
        return newTime
    }
    createSingleTodo(todo) {
        $(".todo_list").prepend(this.createTodoElement(todo))
        this.#todos.unshift(todo);                   
    } 
    createInitialBlok(){
        return ` <div class="todo_container">
                    <div id="add_container" class="add_container">
                        <input type="text" class="input_create input_title" placeholder="ToDo Title" id="input_title">
                        <input type="text" class="input_create input_body" placeholder="ToDo Body" id="input_body">
                        <button id="button_create" class="button_create">Create ToDo</button>
                    </div> 
                    <div class="error">
                        <div class="title_error"></div>
                        <div class="body_error"></div>
                    </div>               
                    <div class="todo_list"></div>                 
                </div>                    
                <div class="edit_container">
                    <h2>Edit ToDo</h2>
                    <div class="error_edit">
                        <div class="edit_title_error"></div>
                        <div class="edit_body_error"></div>
                    </div>
                    <div class="edit_todo">
                        <input type="text" class="edit_title" id="edit_title" placeholder="ToDo Title">
                        <input type="text" class="edit_body" id="edit_body" placeholder="ToDo Body">
                        <button id="button_change" class="save">Save ToDo</button>
                    </div>
                </div>`
    }
    onTodoClick = (e) =>{
        const target = e.target;
        if (this.#current.el) {
            this.#current.el.classList.remove(TodoView.CLASSES.active_item)       
        }
        this.#current.el = e.target.closest(".todo_items");
        if (this.#current.el) {
            this.#current.todo = this.#todos.find(
                (e) => e.id === this.#current.el.id
            );            
        }      
        if(e.target.classList.contains(TodoView.CLASSES.close)){
            this.onTodoDelete(this.#current.todo)           
            return;
        }
        if(e.target.classList.contains(TodoView.CLASSES.complete)){
            this.onTodoComplete(this.#current.todo)   
            return;
        }
        if(e.target.classList.contains(TodoView.CLASSES.title)
        || e.target.classList.contains(TodoView.CLASSES.body)){
            this.onTodoEdit((this.#edit.el));                            
            return;
        }  
    }   
    onTodoComplete = (todo) => {                     
        todo.isComplete = true;        
        this.#options.onComplete(todo, todo.id);   
        this.#current.el.classList.add(TodoView.CLASSES.todo_complete)                
        this.clearDate(); 
    }  
    onTodoDelete(todo) {
            this.#options.onDelete(todo.id);
            this.#todos = this.#todos.filter((t) => t.id !== todo.id);
            this.#current.el.remove();            
            this.clearDate();            
     }    
    onTodoEdit = (el) => { 
        const edit_Title = this.#current.todo.title;
        const edit_Body = this.#current.todo.body; 
        this.#current.el.classList.add(TodoView.CLASSES.active_item);  
        $('#edit_title').val(edit_Title);
        $('#edit_body').val(edit_Body); 
        this.#edit.el.addClass("show_edit"); 
         
         
    }
    onTodoSave = (todo, id) => {          
        const title = $("#edit_title").val();
        const body = $("#edit_body").val();
        this.#current.todo.body = body;
        this.#current.todo.title = title;
        this.#options.onEdit(this.#current.todo, this.#current.todo.id)        
        if(this.#current.todo && this.#current.todo.id){ 
            this.#current.el.querySelector(".title").innerHTML = title;
            this.#current.el.querySelector(".body").innerHTML = body;    
            this.#current.el.classList.remove(TodoView.CLASSES.active_item);           
            this.#edit.el.removeClass("show_edit");  
            this.clearDate();                
        }
         
    }
    clearDate() {     
        this.#current.el = null;  
        this.#current.todo = null;          
    }
    
}


