import { Link } from 'react-router-dom';
import * as userService from '../services/users-service';

const Navbar = ({ user, setUser }) => {
    console.log(user);

    const handleLogOut = () => {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav>
            <ul>
                { user ? (
                    <>  
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {/* <li>Welcome, {user.profile.name}</li> */}
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