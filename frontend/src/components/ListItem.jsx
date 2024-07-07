import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import CardForm from './CardForm';
import CardDetail from './CardDetail';

const ListItem = ({ list, client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    return (
        <div>
            <div className='flex flex-row bg-blue-400 rounded py-1 px-2.5'>
                <h3 className='mr-3'>{list.title}</h3>
                <button>...</button>
            </div>
            <div className='flex flex-col'>
                {list.cards.map((card, index) => (
                    <div key={index}>
                        {/* <Link to={`/card/${card._id}`}>
                        </Link> */}
                        <button onClick={() => setIsCardModalOpen(true)}>{card.title}</button>
                        <CardDetail card={card} isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} />
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