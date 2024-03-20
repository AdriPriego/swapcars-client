import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: `${API_URL}/api`
})

const errorHandler = (error) => {
    throw error
}

const uploadImage = (file) => {
    return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler)
}

export default {uploadImage}