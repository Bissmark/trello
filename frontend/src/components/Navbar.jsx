import { Link } from 'react-router-dom';

const Navbar = ({ user,  profile, logOut }) => {
    console.log(user);

    return (
        <nav>
            <ul>
                { user ? (
                    <>  
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li>Welcome, { profile.email || user.name }</li>
                        <li><button onClick={logOut}>Log Out</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Log In</Link></li>
                )}                
            </ul>
        </nav>
    )
}

export default Navbar;