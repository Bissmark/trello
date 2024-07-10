import { Link } from 'react-router-dom';
import * as userService from '../services/users-service';
import { googleLogout } from '@react-oauth/google';

const Navbar = ({ user, setUser, profile, setProfile }) => {

    const handleLogOut = () => {
        userService.logOut();
        setUser(null);
    }
    //console.log(profile);

    const logOut = () => {
        googleLogout();
        setProfile([]);
    };

    return (
        <nav>
            <ul>
                { user ? (
                    <>  
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>Welcome, { profile.email }</li>
                        <li><button onClick={handleLogOut}>Log Out</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Log In</Link></li>
                )}                
            </ul>
        </nav>
    )
}

export default Navbar;