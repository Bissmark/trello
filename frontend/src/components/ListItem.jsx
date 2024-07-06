import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import CardForm from './CardForm';
import CardDetail from './CardDetail';

const ListItem = ({ list, onAddCard }) => {
    const [addingCard, setAddingCard] = useState(false);
    const [cardName, setCardName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({
        title: '',
        description: '',
        image: '',
    });

    const _handleAddCard = () => {
        console.log('Adding List:', cardName);
        onAddCard(cardName);
        //setCards([...cards, newCard]);
        setCardName('');
    }

    return (
        <div>
            <h3>{list.title}</h3>
            <div className='flex flex-col'>
                {cards.map((card, index) => (
                    <div key={index}>
                        <Link to={`/card/${card.title}`}>
                            <CardDetail card={card} />
                        </Link>
                    </div>
                ))}
            </div>
            {!addingCard ? (
                <>
                    <button onClick={() => setIsModalOpen(true)}>
                        <span><GrAdd /></span>
                        Add Card
                    </button>
                    <CardForm list={list} setCards={setCards} setNewCard={setNewCard} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </>
            ) : (
                <div>
                    <input
                        type='text'
                        placeholder='Enter a title for this card...'
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                    <button onClick={_handleAddCard}>Save</button>
                    <button onClick={() => setAddingCard(false)}>Cancel</button>
                </div>
            
            )}
        </div>
    )
}

export default ListItem;