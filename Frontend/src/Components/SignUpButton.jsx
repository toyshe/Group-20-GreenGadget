import { Link } from "react-router-dom";

const SignUpButton = () => {
    return (
        <Link className="nava" to="/signup">
            <button className="nav-buttons">Sign Up</button>
        </Link>
    );
};

export default SignUpButton;