class TodoModel {
    #http = null;
    #endpoint = null;    

    constructor(endpoint){
        this.#endpoint = endpoint;
        this.#http = new Http();        
    }
    getAllTodos() {        
        return this.#http.getAllTodo(this.#endpoint)              
    }
    crateTodo = (todo) =>{
        return this.#http
        .create(this.#endpoint, {...todo, isComplete: false})
        .then((r) => r);
        
    }
    completeTodo = (todo, id) => {                   
        return this.#http
        .update(this.#endpoint + id, todo)
        .then((r) => r);
    }
    deleteTodo = (id) => {            
        return this.#http
        .delete(this.#endpoint, id)
        .then((r) => r);
    }
    editeTodo = (todo, id) => { 
        return this.#http
        .update(this.#endpoint + id, todo)
        .then((r) => r);
    }
}      

