import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { GoogleOAuthProvider} from '@react-oauth/google'
import { getUser } from '../services/users-service';
import Navbar from '../components/Navbar'
import Home from './Home'
import AuthPage from './AuthPage'
import Profile from './Profile'
import axios from 'axios';

const queryClient = new QueryClient();

const App = () => {
    // const [user, setUser] = useState(getUser());
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json',
                }
            })
            .then(response => {
                setProfile(response.data)
            })
            .catch(error => console.error('Error:', error));
        }
    }, [user]);

    return (
        <div>
            { user ?
                <QueryClientProvider client={queryClient}>
                    <Navbar user={user} setUser={setUser} profile={profile} setProfile={setProfile} />
                    <Routes>
                        <Route path="/" element={<Home client={queryClient} user={user} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </QueryClientProvider>
            : 
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <AuthPage user={user} setUser={setUser} setProfile={setProfile} />
                </GoogleOAuthProvider>
            }
        </div>
    )
}

export default App
