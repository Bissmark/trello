import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { useQuery } from '@tanstack/react-query';

const AuthPage = ({ user, setUser, setProfile, login, logOut }) => {
    const [showSignup, setShowSignup] = useState(false);

    // const { isFetching, error, data } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: () => {
    //         const response = fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`);
    //         if (!response.ok) throw new Error('Bad Request');
    //         console.log(user);
    //         return response.json();
    //     },
    //     onSuccess: (data) => {
    //         setProfile(data);
    //     },
    //     //enabled: !!user.access_token
    // })

    //if (isFetching) return <p>Loading...</p>
    //if (error) return <p>Error: {error.message}</p>

    return (
        <main>
            { showSignup ? 
                <SignUpForm setUser={setUser} showSignup={showSignup} setShowSignup={setShowSignup} />
                :
                <LoginForm user={user} setUser={setUser} login={login} logOut={logOut} setProfile={setProfile} showSignup={showSignup} setShowSignup={setShowSignup} />
            }
        </main>
    )
}

export default AuthPage;