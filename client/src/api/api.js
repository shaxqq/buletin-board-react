import axios from 'axios'

<<<<<<< HEAD
const api = axios.create({ baseURL: '/api'})
//http://localhost:8080/api
=======
const api = axios.create({ baseURL: 'http://localhost:8000/api' || '/api'})
//http://localhost:8000/api
>>>>>>> testing
export const createPost = param => api.post(`/post`, param)
export const getAllPost = () => api.get(`/posts`)
export const updatePostById = (id, param) => api.put(`/post/${id}`, param)
export const deletePostById = id => api.delete(`/post/${id}`)
export const getPostById = id => api.get(`/post/${id}`)

const apis = {
    createPost,
    getAllPost,
    updatePostById,
    deletePostById,
    getPostById,
}

export default apis