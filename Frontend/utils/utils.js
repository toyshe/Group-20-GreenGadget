import axios from 'axios'

const greengadgetApi = axios.create({
    baseURL: 'https://group-20-greengadget.onrender.com/'
})

export default function postLoginInfo({usernameOrEmail, password}){
    console.log({usernameOrEmail, password});
    return greengadgetApi.post('/login', {usernameOrEmail: usernameOrEmail, password: password}).then(({data}) => {
        if(data.loginMessage === `Welcome back, ${usernameOrEmail}`) {
            return data.loginMessage
        } else {
            return Promise.reject({err: 'Invalid credentials'})
        }
    }).catch(({response: {data}}) => {
        return data.loginMessage
    })
}