import { useEffect, useState } from 'react';
import { GrAdd } from "react-icons/gr";
import ListItem from '../components/ListItem';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

const Home = ({ client }) => {
    const [addingList, setAddingList] = useState(false);
    const [listName, setListName] = useState('');
    const [cards, setCards] = useState([]);

    const { isFetching, error, data: lists, refetch } = useQuery({
        queryKey: ['lists'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/lists');
            if (!response.ok) throw new Error('Bad Request');
            return response.json();
        },
    })

    const addListMutation = useMutation({
        mutationFn: async (newList) => {
            const response = await fetch('http://localhost:3001/lists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        onSuccess: () => {
            // Invalidate and refetch lists query to update the UI
            client.invalidateQueries(['lists']);
        },
    });
    

    const _handleSubmit = async (e) => {
        e.preventDefault();
        await addListMutation.mutateAsync({ title: listName });
        setListName('');
        setAddingList(false);
    }


    const addCardToList = (newCard) => {
        setCards([...cards, newCard]);
    }

    if (isFetching) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className='flex flex-row'>
            <div className='flex flex-row flex-start'>
                {lists?.map((list, index) => (
                    <div key={index}>
                        <ListItem list={list} onAddCard={addCardToList} client={client} />
                    </div>
                ))}
            </div>
            <div>
                {!addingList ? (
                    <button onClick={() => setAddingList(true)}><span><GrAdd /></span>Add List</button>
                ) : (
                    <form onSubmit={_handleSubmit}>
                        <input
                            type='text'
                            placeholder='Enter a title for this list...'
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <button type='submit'>Save</button>
                        <button onClick={() => setAddingList(false)}>Cancel</button>
                    </form>
                
                )}
            </div>
        </div>
    )
}

export default Home;