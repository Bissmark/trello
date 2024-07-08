const List = require('../models/list');

const index = async (req, res) => {
    try {
        const lists = await List.find({}).populate('cards');
        res.status(200).json(lists);
    } catch(err) {
        res.status(400).json(err);
    }
};

const create = async (req, res) => {
    try {
        const list = await List.create(req.body);
        res.status(201).json(list);
    } catch(err) {
        res.status(400).json(err);
    }
};

const deleteList = async (req, res) => {
    console.log(req.body);
    try {
        await List.deleteOne({_id: req.body.listId});
        res.json(true);
    } catch(err) {
        res.status(400).json(err);
    }
};

module.exports = {
    create,
    index,
    delete: deleteList
};