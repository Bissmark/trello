import { useState } from 'react';
import { GrAdd } from "react-icons/gr";
import ListItem from '../components/ListItem';

const Home = () => {
    const [addingList, setAddingList] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);

    const _handleAddList = () => {
        console.log('Adding List:', listName);
        setLists([...lists, listName]);
        setAddingList(false);
        setListName('');
    }

    const addCardToList = (newCard) => {
        setCards([...cards, newCard]);
    }

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