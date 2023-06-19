import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth'))?.token ?? ''}`}
})

export default instance