const Card = require('../models/card');
const List = require('../models/list');

const addCard = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const list = await List.findById(req.body.listId);
        if (!list) {
            console.log('List not found with id:', req.body.listId);
            return res.status(404).json({ message: 'List not found' });
        }
        console.log('List:', list);

        const cardData = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority
        };
        const card = await Card.create(cardData);
        if (!card) {
            console.log('Failed to create card with data:', cardData);
            return res.status(500).json({ message: 'Failed to create card' });
        }
        console.log('Card created:', card);

        list.cards.push(card);
        await list.save();
        res.status(201).json(card);
    } catch (err) {
        console.error('Error adding card:', err);
        res.status(400).json(err);
    }
};

module.exports = {
    addCard
};