import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { GoogleOAuthProvider} from '@react-oauth/google'
import { getUser } from '../services/users-service';
import Navbar from '../components/Navbar'
import Home from './Home'
import AuthPage from './AuthPage'

const queryClient = new QueryClient();

function App() {
    const [user, setUser] = useState(getUser());

    return (
        <div>
            { user ?
                <QueryClientProvider client={queryClient}>
                    <Navbar user={user} setUser={setUser} />
                    <Routes>
                        <Route path="/" element={<Home client={queryClient} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </QueryClientProvider>
            : 
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <AuthPage setUser={setUser} />
                </GoogleOAuthProvider>
            }
        </div>
    )
}

export default App
