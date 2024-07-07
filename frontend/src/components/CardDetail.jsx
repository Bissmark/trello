const CardDetail = ({ card, onClose, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="default-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h4>Title: {card.title}</h4>
                <p>Description: {card.description}</p>
                <p>Priority: {card.priority}</p>
                <div className="flex justify-end gap-2">
                    <button>Edit</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;