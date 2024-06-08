import { useContext, useState } from "react"
import { postSignUpInfo } from "../../utils/utils"
import UserContext from "../contexts/UserContext"

export default function SignUp() {

    const [userType, setUserType] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [houseNumber, setHouseNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')
    const [country, setCountry] = useState('')
    const [utr, setUtr] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [reenterPassword, setReenterPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [avatar, setAvatar] = useState('')
    const { setLoggedInUser } = useContext(UserContext)

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const isPasswordValid = (password) => {
        // Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isEmailValid = (email) => {
        // Simple email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isUKPhoneNumberValid = (phone) => {
        // UK phone number validation using regular expression
        const phoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/
        return phoneRegex.test(phone);
    };

    const isPasswordSame = (password, reenterPassword) => {
        return password === reenterPassword
    }

    const handleUserType = (e) => {
        e.preventDefault();
        setUserType(e.target.value)
    }

    const handleAvatar = (e) => {
        e.preventDefault()
        setAvatar(e.target.value)
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        if (
            (userType === 'customer' || userType === 'shopkeeper') &&
            username && name && password && email && phone &&
            houseNumber && street && city && postcode && country && avatar
        ) {
            if (userType === 'shopkeeper' && !utr) {
                setErrorMessage('Please enter UTR.');
                return;
            }
            postSignUpInfo({ username, name, password, email, phone, houseNumber, street, city, postcode, country, utr, userType, avatar }).then((data) => {
                if (data === 'Username already exists' || data === 'Email already exists' || data === 'Phone number already exists') {
                    setError(data)
                }
                else {
                    setLoggedInUser(data)
                    setError('')
                }
                setLoading(false)
                togglePopup();
            }).catch((err) => {
                setLoading(false)
                setError(err)
                togglePopup();
            })
        } else {
            setLoading(false)
            setErrorMessage('Please fill in all fields including chosing a user type from top of the page')
        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2 style={{ display: 'inline-block' }}>What type of user are you?</h2><span className="required-fields"> *</span>
                <div className="user-type-container">

                    <button value='customer' id='customer-button' onClick={handleUserType} className={`user-type-button ${userType === 'customer' ? 'selected' : ''}`} >Customer</button>
                    <button value='shopkeeper' id="shopkeeper-button" onClick={handleUserType} className={`user-type-button ${userType === 'shopkeeper' ? 'selected' : ''}`} >Shopkeeper</button>
                </div>

                <h2 style={{ display: 'inline-block' }}>Choose an avatar</h2><span className="required-fields"> *</span>
                <div className="avatar-container">

                    <button value="https://iili.io/JUF4dWQ.png" onClick={handleAvatar} className="user-avatar-buttons"><img className="user-avatar-select" src="https://iili.io/JUF4dWQ.png" /></button>
                    <button value="https://iili.io/JUF4gEB.png" onClick={handleAvatar} className="user-avatar-buttons"><img className="user-avatar-select" src="https://iili.io/JUF4gEB.png" /></button>
                </div>

                <label htmlFor="username">Username</label><span className="required-fields"> *</span>
                <input type="text" id="username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}
                    className={username ? (username.length >= 6 ? 'input-valid' : 'input-invalid') : ''}
                />
                {username && username.length < 6 && <p className="error-message">Username must be at least 6 characters long.</p>}

                <label htmlFor="name">Full Name</label><span className="required-fields"> *</span>
                <input type="text" id="name" value={name} placeholder="Enter full name" onChange={(e) => setName(e.target.value)} required />

                <label htmlFor="password">Password</label><span className="required-fields"> *</span>
                <input type="password" id="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
                    className={password ? (isPasswordValid(password) ? 'input-valid' : 'input-invalid') : ''}
                />
                {password && !isPasswordValid(password) && <p className="error-message">Password must contain at least 8 characters including:
                    <li>
                        at least one uppercase letter
                    </li>
                    <li>
                        one lowercase letter
                    </li>
                    <li>
                        one digit
                    </li>
                    <li>
                        one special character.
                    </li>
                </p>}

                <label htmlFor="reenter-password">Confirm Password</label><span className="required-fields"> *</span>
                <input type="password" id="reenter-password" value={reenterPassword} placeholder="Confirm password" onChange={(e) => setReenterPassword(e.target.value)}
                    className={reenterPassword ? (isPasswordSame(password, reenterPassword) ? 'input-valid' : 'input-invalid') : ''}
                />


                <label htmlFor="email">Email</label><span className="required-fields"> *</span>
                <input type="text" id="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                    className={email ? (isEmailValid(email) ? 'input-valid' : 'input-invalid') : ''}
                />
                {email && !isEmailValid(email) && <p className="error-message">Please enter a valid email address.</p>}


                <label htmlFor="phone">Phone Number</label><span className="required-fields"> *</span>
                <input type="text" id="phone" value={phone} placeholder="Enter phone number" onChange={(e) => setPhone(e.target.value)}
                    className={phone ? (isUKPhoneNumberValid(phone) ? 'input-valid' : 'input-invalid') : ''}
                />
                {phone && !isUKPhoneNumberValid(phone) && <p className="error-message">Please enter a valid UK phone number.</p>}


                <label htmlFor="house_number">House Number</label><span className="required-fields"> *</span>
                <input type="text" id="house_number" value={houseNumber} placeholder="Enter house number" onChange={(e) => setHouseNumber(e.target.value)} required />

                <label htmlFor="street">Street</label><span className="required-fields"> *</span>
                <input type="text" id="street" value={street} placeholder="Enter street" onChange={(e) => setStreet(e.target.value)} required />

                <label htmlFor="city">City</label><span className="required-fields"> *</span>
                <input type="text" id="city" value={city} placeholder="Enter city" onChange={(e) => setCity(e.target.value)} required />

                <label htmlFor="postcode">Postcode</label><span className="required-fields"> *</span>
                <input type="text" id="postcode" value={postcode} placeholder="Enter postcode" onChange={(e) => setPostcode(e.target.value)} required />

                <label htmlFor="country">Country</label><span className="required-fields"> *</span>
                <input type="text" id="country" value={country} placeholder="Enter country" onChange={(e) => setCountry(e.target.value)} required />

                {userType === 'shopkeeper' ?
                    <>
                        <label htmlFor="utr">UTR</label><span className="required-fields"> *</span>
                        <input type="text" id="utr" value={utr} placeholder="Enter UTR" onChange={(e) => setUtr(e.target.value)} required />
                    </>
                    : null}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={() => document.getElementById('id02').style.display = 'block'} style={{ width: 'auto' }}>Submit</button>

            </form>
            {loading && <p>Loading...</p>} 
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{error ? `Sign-up failed. ${error}. Please try again.` : 'Sign-up successful!'}</p>
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}

        </div>
    )
}