import axios from "axios";


const instance  = axios.create({
    baseURL : "https://api.themoviedb.org/3", // instance.get('/movies') corresponds to https://api.themoviedb.org/3/movies
});

export default instance ;