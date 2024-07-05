import { useState } from 'react';
import ListItem from '../components/ListItem';

const Home = () => {
    const [addingList, setAddingList] = useState(false);
    const [listName, setListName] = useState('');
    const [lists, setLists] = useState([]);

    const _handleAddList = () => {
        console.log('Adding List:', listName);
        setLists([...lists, listName]);
        setAddingList(false);
        setListName('');
    }

    return (
        <div className='flex flex-row flex-start'>
            <div>
                {lists.map((item, index) => (
                    <div key={index}>
                        <ListItem item={item} />
                    </div>
                ))}
            </div>
            <div>
                {!addingList ? (
                    <button onClick={() => setAddingList(true)}>Add List</button>
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