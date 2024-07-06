import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import CardForm from './CardForm';
import CardDetail from './CardDetail';

const ListItem = ({ list, client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <h3>{list.title}</h3>
            <div className='flex flex-col'>
                {list.cards.map((card, index) => (
                    <div key={index}>
                        <Link to={`/card/${card.title}`}>
                            <CardDetail card={card} />
                        </Link>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setIsModalOpen(true)}>
                    <span><GrAdd /></span>
                    Add Card
                </button>
                <CardForm list={list} isOpen={isModalOpen} client={client} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    )
}

export default ListItem;