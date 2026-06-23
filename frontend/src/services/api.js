import axios from "axios";


const api = axios.create({

    baseURL:
    "https://whatsapp-otp-system.onrender.com/api"

});


export default api;