import { useState } from 'react';

const Home = () => {
    const [lists, setLists] = useState([]);

    return (
        <div className='flex flex-row flex-start'>
            <h1>Home</h1>
            <p>Welcome to the Home page</p>
        </div>
    )
}

export default Home;