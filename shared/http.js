class Http{
    #API_url = "http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/";
    constructor() {}

    getAllTodo(url) {
       return axios.get(this.#API_url + url).then((r) => r.data);
    }
    getById(id) {
        return axios.get(this.#API_url + url + id).then((r) => r.data) ;
    }
    create(url, item){
        return axios.post(this.#API_url + url, item).then((r) => r.data);
    }
    update(url, item) {
        return axios.put(this.#API_url + url, item).then((r) => r.data);
    }    
    delete(url, id){        
        return axios.delete(this.#API_url + url + id).then((r) => r.data);
    }
}