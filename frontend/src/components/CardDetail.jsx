import { useState } from "react";
import { useQuery } from "@tanstack/react-query"

const CardDetail = ({ card, onClose, isOpen, priorityLevels }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editCard, setEditCard] = useState({
        title: '',
        description: '',
        priority: '',
    });
    console.log(card);

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['cards', card.id], 
    //     queryFn: async () => {
    //         const response = await fetch(`http://localhost:3001/cards/${card._id}`);
    //         //console.log(response);
    //         if (!response.ok) throw new Error('Network response was not ok');
    //         return response.json();
    //     }
    // });

    const _handleChange = (e) => {
        setEditCard(prevState => ({ 
            ...prevState, 
            [e.target.name]: e.target.value 
        }));
    }

    //if (isPending) return <p>Loading...</p>
    //if (error) return <p>Error: {error.message}</p>
    if (!isOpen) return null;
    if (!card) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="default-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                {isEditing ? (
                    <div>
                        <div>
                            <label>Title:</label>
                            <input 
                                type="text"
                                name="title"
                                value={card.title}
                                onChange={_handleChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input 
                                type="text"
                                name="description"
                                value={card.description}
                                onChange={_handleChange}
                            />
                        </div>
                        <div>
                            <label>Priority:</label>
                            <select 
                                name="priority"
                                value={card.priority}
                                onChange={_handleChange}
                            >
                                {Object.values(priorityLevels).map((level, index) => (
                                    <option key={index} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>Title: {card.title}</h4>
                        <p>Description: {card.description}</p>
                        <p>Priority: {card.priority}</p>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    {isEditing ? (
                        <button onClick={() => setIsEditing(false)}>Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    )}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;