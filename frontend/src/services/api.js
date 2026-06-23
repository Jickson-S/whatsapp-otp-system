import axios from "axios";


const api = axios.create({

    baseURL:
    "http://localhost:5010/api"

});


export default api;