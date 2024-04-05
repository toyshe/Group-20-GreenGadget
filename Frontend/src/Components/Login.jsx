import { useState } from "react";
import postLoginInfo from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginMessage, setLoginMessage] = useState('')

    const handleUsernameOrEmail = (e) => {
        setUsernameOrEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postLoginInfo({ usernameOrEmail, password }).then((data) => {
            if (data === 'Welcome back, ' + usernameOrEmail) {
                setLoginMessage('')
                navigate('/home')
            } else {
                setLoginMessage('Invalid credentials. Please try again.')
            }
        }).catch(error => {
            console.error('Error during login:', error);
            setLoginMessage('An error occurred while logging in. Please try again later.')
        })
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="usernameOrEmail">Username or Email: </label>
                <input id="usernameOrEmail" type="text" name="usernameOrEmail" value={usernameOrEmail} onChange={handleUsernameOrEmail} placeholder="Enter a username or email" />
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" value={password} onChange={handlePassword} placeholder="Enter a password" />
                <button onClick={handleSubmit}>Enter</button>
            </form>
            {loginMessage && <p>{loginMessage}</p>}
        </div>
    )
}