import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { googleLogout} from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Home from './Home'
import AuthPage from './AuthPage'
import Profile from './Profile'
import * as authService from '../services/authService';

const queryClient = new QueryClient();

const App = () => {
    const [user, setUser] = useState(authService.getUser());
    // const [user, setUser] = useState(getUser());
    const [profile, setProfile] = useState([]);

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         setUser(user);
    //         setProfile(user);
    //     }
    // }, []);

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('user');
        setProfile([]);
        setUser(null);
    };

    return (
        <div>
            <QueryClientProvider client={queryClient}>
                { user ?
                    <>
                        <Navbar user={user} setUser={setUser} logOut={logOut} profile={profile} setProfile={setProfile} />
                        <Routes>
                            <Route path="/" element={<Home client={queryClient} user={user} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                            <Route path='/profile' element={<Profile />} />
                        </Routes>
                    </>
                :
                <AuthPage user={user} setUser={setUser} setProfile={setProfile} logOut={logOut} />
                }
            </QueryClientProvider>
        </div>
    )
}

export default App
