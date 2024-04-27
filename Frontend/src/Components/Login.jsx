import { useContext, useEffect, useState } from "react";
import postLoginInfo from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate()
    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginMessage, setLoginMessage] = useState('')
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const {setLoggedInUser} = useContext(UserContext)

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const savedChecked = localStorage.getItem('checked');

        if (savedChecked === 'true' && savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setChecked(true);
        }
    }, []);

    const handleUsernameOrEmail = (e) => {
        setUsernameOrEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        postLoginInfo({ usernameOrEmail, password }).then((data) => {
            setLoading(true)
            if (data.username === usernameOrEmail || data.email === usernameOrEmail) {
                console.log(data);
                setLoginMessage('')
                setLoggedInUser(data)
                document.getElementById('id01').style.display = "none";
                navigate('/')
            } else {
                setLoginMessage('Invalid credentials. Please try again.')
            }

            if (checked) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                localStorage.setItem('checked', Checked);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('checked');
            }
        }).catch(error => {
            console.error('Error during login:', error);
            setLoginMessage('An error occurred while logging in. Please try again later.')
        })
    }

    const handleChecked = () => {
        setChecked(!checked)
    }

    return (
        
        <div className="Loginbutton">
            {/* {loading ? <p>Loading</p>: null} */}
            <button onClick={() => document.getElementById('id01').style.display = 'block'} style={{ width: 'auto', marginRight: '5px' }}>Login</button>

            <div id="id01" className="modal" style={{ display: 'none' }}>
                <form className="modal-content animate" onSubmit={handleSubmit}>
                    <div className="imgcontainer">
                        <span onClick={() => document.getElementById('id01').style.display = 'none'} className="close" title="Close Modal">&times;</span>
                    </div>

                    <div className="container">
                        <label htmlFor="usernameOrEmail"><b>Username or Email</b></label>
                        <input type="text" id="usernameOrEmail" value={usernameOrEmail} onChange={handleUsernameOrEmail} placeholder="Enter Username or Email" name="usernameOrEmail" required />

                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" id="password" value={password} onChange={handlePassword} placeholder="Enter Password" name="password" required />

                        <button type="submit">Login</button>
                        <label>
                            <input type="checkbox" checked={checked} onChange={handleChecked} name="remember" /> Remember me
                        </label>
                    </div>

                    <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
                        <button type="button" onClick={() => document.getElementById('id01').style.display = 'none'} className="cancelbtn">Cancel</button>
                        <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>
                    {loginMessage && <p>{loginMessage}</p>}
                </form>
            </div>
            {window.onclick = function (event) {
                if (event.target == document.getElementById('id01')) {
                    document.getElementById('id01').style.display = "none";
                }
            }}
        </div>
    )
}
