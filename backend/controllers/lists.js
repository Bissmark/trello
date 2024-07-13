const List = require('../models/list');

const index = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user._id }).populate('user').sort({createdAt: 'desc'});
        res.status(200).json(lists);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};

const create = async (req, res) => {
    try {
        const list = await List.create({...req.body, user: req.user._id});
        console.log(list);
        res.status(201).json(await list.populate('user'));
    } catch(err) {
        res.status(400).json(err);
    }
};

const deleteList = async (req, res) => {
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