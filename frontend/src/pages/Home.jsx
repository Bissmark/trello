import { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import ListItem from '../components/ListItem';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Form } from 'react-router-dom';



const Home = () => {
    const [addingList, setAddingList] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);

    const { isFetching, error, data } = useQuery({
        queryKey: ['lists'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/lists');
            if (!response.ok) throw new Error('Bad Request');
            return response.json();
        },
    })

    const mutation = useMutation({
    mutationFn: async (formData) => {
        const response = await fetch('http://localhost:3001/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Bad Request');
        return response.json();
    },
})
    

    const _handleAddList = () => {
        console.log('Adding List:', listName);
        setLists([...lists, listName]);
        mutation.mutate({ title: listName }, {
            onSuccess: (data) => {
                console.log('List added:', data);
                setAddingList(false);
                setListName('');
            },
            onError: (error) => {
                console.log('Error adding list:', error);
            },
        
        });
    }


    const addCardToList = (newCard) => {
        setCards([...cards, newCard]);
    }

    if (isFetching) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    if (!data) return console.log('No data found');

    return (
        <div className='flex flex-row'>
            <div>
                {lists.map((item, index) => (
                    <div key={index}>
                        <ListItem item={item} onAddCard={addCardToList} />
                    </div>
                ))}
            </div>
            <div>
                {!addingList ? (
                    <button onClick={() => setAddingList(true)}><span><GrAdd /></span>Add List</button>
                ) : (
                    <div>
                        <input
                            type='text'
                            placeholder='Enter a title for this list...'
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                        />
                        <button onClick={_handleAddList}>Save</button>
                        <button onClick={() => setAddingList(false)}>Cancel</button>
                    </div>
                
                )}
            </div>
        </div>
    )
}

export default Home;