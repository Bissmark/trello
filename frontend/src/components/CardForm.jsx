import { useState } from "react";
import { MdDriveFileRenameOutline, MdOutlineDescription } from "react-icons/md";
import { GoImage } from "react-icons/go";
import { BiCategory } from "react-icons/bi";

const CardForm = ({ list, isOpen, onClose, setNewCard, setCards }) => {
    const [image, setImage] = useState('');
    const [card, setCard] = useState({
        title: '',
        description: '',
        image: '',
    });

    const _handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
        
    const _handleSubmit = (e) => {
        e.preventDefault();
        const newCard = {
            ...card,
            list
        };
        console.log('Adding Card:', newCard);
        setNewCard(newCard);
        setCards((cards) => [...cards, newCard]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" id="default-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <form onSubmit={_handleSubmit}>
                    <div className="name-field-tasks flex items-center gap-2">
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            placeholder="Enter a title for this card..."
                            required
                            className="input input-bordered w-full"
                            onChange={(e) => setCard({ ...card, title: e.target.value })}
                        />
                    </div>
                    <div className="description-field flex items-center gap-2 my-4">
                        <MdOutlineDescription />
                        <textarea
                            placeholder="Enter a description for this card..."
                            required
                            className="textarea textarea-bordered w-full"
                            onChange={(e) => setCard({ ...card, description: e.target.value })}
                        />
                    </div>
                    <div className="file-upload my-4">
                        <GoImage />
                        <input type="file" id="files" className="hidden" onChange={_handleImageChange} />
                        <label htmlFor="files" className="label cursor-pointer">
                            {image ? image.name : 'Select File'}
                        </label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="btn">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Card</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardForm;