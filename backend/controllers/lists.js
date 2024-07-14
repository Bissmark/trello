const List = require('../models/list');
const Board = require('../models/board');

const index = async (req, res) => {
    try {
        const lists = await List.find({}).populate('board').sort({createdAt: 'desc'});
        res.status(200).json(lists);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
};

const create = async (req, res) => {
    console.log(req.body);
    try {
        //req.body.user = req.user._id;
        //const list = await List.create(req.params.id);
        // const board = await Board.findById(req.body.board);
        // console.log(board);
        // board.lists.push(req.body);
        // await board.save();
        const newList = await List.create({
            title: req.body.title,
            board: req.body.board // Assuming you want to keep a reference to the board in your list
        });

        // Step 2: Get the ObjectId of the newly created list
        const listId = newList._id;

        // Step 3: Update the board document by pushing the listId into board.lists
        await Board.findByIdAndUpdate(req.body.board, {
            $push: { lists: listId }
        });
        //console.log(list);
        res.send({ message: 'List created and added to board successfully!' });
    } catch(err) {
        console.log(err);
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