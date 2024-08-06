import { useContext, useEffect, useState } from "react";
import postLoginInfo from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";


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
            // console.log({data});
            // let uews = data.username
            // console.log({data, uews})
            if (data.username === usernameOrEmail || data.email === usernameOrEmail) {
                console.log({data});
                setLoginMessage('')
                setLoggedInUser(data)
                document.getElementById('id01').style.display = "none";
                navigate('/')
            } else {
                // setLoginMessage('Invalid credentials. Please try again.');
                setLoginMessage('Invalid password. Please check and try again.')

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
        <>
        <div className="Loginbutton">
            {/* {loading ? <p>Loading</p>: null} */}
            <button onClick={() => document.getElementById('id01').style.display = 'block'} style={{ width: 'auto', marginRight: '5px' }}>Login</button>
        </div>

        <div id="id01" className="modal" style={{ display: 'none' }}>
                <form className="modal-content animate" onSubmit={handleSubmit}>
                    <h4 className="login-heading">Login 
                    <span onClick={() => document.getElementById('id01').style.display = 'none'} className="close" title="Close Modal">&times;</span>
                    </h4>
                    {/* <div className="imgcontainer">
                        <span onClick={() => document.getElementById('id01').style.display = 'none'} className="close" title="Close Modal">&times;</span>
                    </div> */}
                    {loginMessage && <p style={{textAlign:"center"}} id="id04" className="input-invalid">{loginMessage}</p>}

                    <div className="container">
                        <label htmlFor="usernameOrEmail"><b>Username or Email</b></label>
                        <input type="text" id="usernameOrEmail" value={usernameOrEmail} onChange={handleUsernameOrEmail} placeholder="Enter Username or Email" name="usernameOrEmail" required />

                        <label htmlFor="spassword"><b>Password</b></label>
                        <input type="password" id="spassword" value={password} onChange={handlePassword} placeholder="Enter Password" name="password" required />

                        <button type="submit">Login</button>
                        <div className="remember-me">
                            <input type="checkbox" checked={checked} onChange={handleChecked} name="remember" id="rmber" /> 
                            <span><label htmlFor="rmber">Remember me</label></span>
                        </div>
                    </div>
                    <p className="csu" >Not a member? <Link to={'/SignUp'} id="id03">Sign up</Link></p> 

                    <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
                        <button type="button" onClick={() => document.getElementById('id01').style.display = 'none'} className="cancelbtn">Cancel</button>
                        <span className="psw"><a href="#">Forgot Password?</a></span>
                        {/* implement lateer */}
                    </div>
                    {/* {loginMessage && <p style={{textAlign:"center"}} className="input-invalid">{loginMessage}</p>} */}
                </form>
            </div>
            {window.onclick = function (event) {
                if (event.target == document.getElementById('id01') || event.target == document.getElementById('id03')) {
                    document.getElementById('id01').style.display = "none";
                }
            }}
        </>
    )
}
