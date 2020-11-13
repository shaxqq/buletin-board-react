import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

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