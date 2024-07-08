import { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import CardForm from './CardForm';
import CardDetail from './CardDetail';
import { useMutation } from '@tanstack/react-query';

const ListItem = ({ list, client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const deleteList = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3001/lists/${list._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listId: list._id })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        onSuccess: () => {
            client.invalidateQueries(['lists']);
        }
    })

    const _handleDelete = async () => {
        await deleteList.mutateAsync();
    }


    return (
        <div>
            <div className='flex flex-row bg-blue-400 rounded py-1 px-2.5'>
                <h3 className='mr-3'>{list.title}</h3>
                <button onClick={_handleDelete}>X</button>
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